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

			user.LowercaseFields();
			string passwordHash = pHasher.Hash(user.Password);

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
				Created_At = res.Created_At,
			};

			return Results.Ok(newUser);
		}

		public async Task<IResult> LoginUser(LoginUserRequest req, string connStr, PasswordHasher pHasher)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			string email = req.email.ToLower();

			var user = await conn.QueryFirstOrDefaultAsync<User>(
				"SELECT * FROM users WHERE email = @email", new { email });
			// Try the username if email fails
			if (user == null)
			{
				user = await conn.QueryFirstOrDefaultAsync<User>(
					"SELECT * FROM users WHERE username = @email", new { email });
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
				Created_At = user.Created_At,
			};
			return isValid ? Results.Ok(new { loggedInUser }) : Results.Unauthorized();
		}

		public async Task<IResult> GetUser(string email, string connStr)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();
			
			email = email.ToLower();

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

		public async Task<IResult> UpdateUser(UpdateUserRequest req, string connStr, PasswordHasher pHasher)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			// see if the user exists
			var existingUser = await conn.QueryFirstOrDefaultAsync<User>(
				"SELECT * FROM users WHERE id = @id", new { req.id });

			if (existingUser is null)
				return Results.NotFound("User not found.");

			// verify the user has a correct password
			bool isValid = pHasher.Verify(req.password, existingUser.Password_Hash);
			if (!isValid)
			{
				return Results.Unauthorized();
			}

			// update user info
			string newPassword = "";
			if (req.new_password != null) 
				newPassword = pHasher.Hash(req.new_password);
			else						  
				newPassword = existingUser.Password_Hash;

			bool newDeleted = req.deleted ?? existingUser.Deleted;
			string newUsername = req.username ?? existingUser.Username;
			string newEmail = req.email ?? existingUser.Email;

			var res = await conn.QueryFirstOrDefaultAsync<UserFrontend>(
				@"UPDATE users SET username = @newUsername, email = @newEmail, password_hash = @newPassword, deleted = @newDeleted WHERE id = @id
				RETURNING id, username, email, created_at, deleted;",
				new { newUsername, newEmail, newPassword, newDeleted, req.id });

			return Results.Ok(res);
		}

	}

	public class LoginUserRequest
	{
		public required string email { get; set; }
		public required string password { get; set; }
	}

	public class UpdateUserRequest
	{
		public required Guid id { get; set; }
		public required string password { get; set; }
		public string? email { get; set; }
		public string? username { get; set; }
		public bool? deleted { get; set; }
		public string? new_password { get; set; }
	}
}
