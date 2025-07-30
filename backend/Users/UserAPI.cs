using Dapper;
using Npgsql;

namespace WatchNext.Users
{
	public class UserAPI
	{
		public async Task<IResult> RegisterUser(UserRegister user, string connStr, PasswordHasher pHasher)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var passwordHash = pHasher.Hash(user.Password);

			var res = await conn.QueryFirstOrDefaultAsync<User>(
				@"INSERT INTO users (username, email, password_hash)
				  VALUES (@Username, @Email, @PasswordHash)
				  RETURNING id, username, email, created_at, deleted;",
				new { user.Username, user.Email, PasswordHash = passwordHash });

			if (res == null) return Results.BadRequest("User creation failed.");

			UserFrontend newUser = new UserFrontend
			{
				Id = res.Id,
				Username = res.Username,
				Email = res.Email,
				Deleted = res.Deleted,
				CreatedAt = res.Created_At,
			};

			return Results.Ok(newUser);
		}

		public async Task<IResult> LoginUser(LoginUserRequest req, string connStr, PasswordHasher pHasher)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var user = await conn.QueryFirstOrDefaultAsync<User>(
				"SELECT * FROM users WHERE email = @email", new { req.email });
			// Try the username if email fails
			if (user == null)
			{
				user = await conn.QueryFirstOrDefaultAsync<User>(
					"SELECT * FROM users WHERE username = @email", new { req.email });
				if (user == null)
				{
					return Results.NotFound("User not found");
				}
			}

			bool isValid = pHasher.Verify(req.password, user.Password_Hash);

			// TODO: return JWT Token 
			UserFrontend loggedInUser = new UserFrontend
			{
				Id = user.Id,
				Username = user.Username,
				Email = user.Email,
				Deleted = user.Deleted,
				CreatedAt = user.Created_At,
			};
			return isValid ? Results.Ok(new { loggedInUser }) : Results.Unauthorized();
		}

		public async Task<IResult> GetUser(string email, string connStr)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var user = await conn.QueryFirstOrDefaultAsync<UserFrontend>(
				"SELECT id, username, email, created_at, deleted FROM users WHERE email = @email", new { email });
			// Try the username if email fails
			if (user == null)
			{
				user = await conn.QueryFirstOrDefaultAsync<UserFrontend>(
				"SELECT id, username, email, created_at, deleted FROM users WHERE username = @email", new { email });
				if (user == null)
				{
					return Results.NotFound("User not found");
				}
			}

			return Results.Ok(new { user });
		}

	}

	public class LoginUserRequest
	{
		public required string email { get; set; }
		public required string password { get; set; }
	}
}
