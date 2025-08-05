using Dapper;
using Npgsql;
using WatchNext.MovieLists;

namespace WatchNext.Users
{
	public class UserAPI
	{
		public required string ConnStr { get; set; }

		public async Task<IResult> RegisterUser(UserRegister user, PasswordHasher pHasher)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			user.LowercaseFields();
			string passwordHash = pHasher.Hash(user.Password);

			// Check to see if user is already in the DB
			var existingUser = await conn.QueryFirstOrDefaultAsync<User>(
				"SELECT * FROM users WHERE email = @email", new { user.Email });

			if (existingUser != null)
				return Results.BadRequest("Email already registered.");

			existingUser = await conn.QueryFirstOrDefaultAsync<User>(
				"SELECT * FROM users WHERE username = @username", new { user.Username });

			if (existingUser != null)
				return Results.BadRequest("Username already registered.");

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

		public async Task<IResult> LoginUser(LoginUserRequest req, PasswordHasher pHasher)
		{
			using var conn = new NpgsqlConnection(ConnStr);
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
			if (user.Deleted == true)
			{
				return Results.BadRequest("Cannot log in, User is deleted");
			}
			bool isValid = pHasher.Verify(req.password, user.Password_Hash);

			// TODO: return JWT Token 
			return isValid ? Results.Ok(user) : Results.Unauthorized();
		}

		public async Task<IResult> DeleteUser(LoginUserRequest req, PasswordHasher pHasher)
		{
			using var conn = new NpgsqlConnection(ConnStr);
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
			if (user.Deleted == true)
			{
				return Results.BadRequest("User is already deleted");
			}
			bool isValid = pHasher.Verify(req.password, user.Password_Hash);
			if (!isValid)
			{
				return Results.Unauthorized();
			}

			var res = await conn.QueryAsync(
				@"UPDATE users SET deleted = true WHERE id = @id
				RETURNING id, username, email, created_at, deleted;",
				new { id = user.Id }
			);
			return Results.Ok(res);
		}

		public async Task<IResult> GetAllUsers()
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryAsync<UserFrontend>(
				"SELECT * FROM users WHERE deleted=false;"
			);
			return Results.Ok(res);
		}

		public async Task<IResult> GetUserById(Guid user_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();
			var user = await conn.QueryFirstOrDefaultAsync<UserFrontend>(
				"SELECT * FROM users WHERE id=@user_id", new { user_id }
			);
			if (user == null)
			{
				return Results.NotFound("User not found");
			}
			return Results.Ok(new { user });
		}

		public async Task<IResult> GetUserByEmail(string email)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			email = email.ToLower();

			var user = await conn.QueryFirstOrDefaultAsync<UserFrontend>(
				"SELECT * FROM users WHERE email = @email", new { email });
			// Try the username if email fails
			if (user == null)
			{
				user = await conn.QueryFirstOrDefaultAsync<UserFrontend>(
				"SELECT * FROM users WHERE username = @email", new { email });
				if (user == null)
				{
					return Results.NotFound("User not found");
				}
			}
			return Results.Ok(new { user });
		}

		public async Task<IResult> GetUserMovieLists(Guid user_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryAsync<MovieList>(
				@"SELECT ml.*
				FROM movie_lists ml
				JOIN user_movie_lists uml ON ml.id = uml.list_id
				JOIN users u on uml.user_id = u.id
				WHERE u.id = @user_id;
				",
			new { user_id });

			return Results.Ok(res);
		}

		public async Task<IResult> UpdateUser(UpdateUserRequest req, PasswordHasher pHasher)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			req.LowercaseFields();

			// see if the user exists
			var existingUser = await conn.QueryFirstOrDefaultAsync<User>(
				"SELECT * FROM users WHERE id = @id", new { req.id });

			if (existingUser is null)
				return Results.NotFound("User not found.");

			// verify the user has the correct password
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
		// TODO: Write email validator function!		public bool IsValidEmail(string email){}
		// TODO: Write password validator function!		public bool IsValidPassword(string password){}
	}
}
