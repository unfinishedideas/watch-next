using Dapper;
using Npgsql;
using WatchNext.Movies;
using WatchNext.Users;

namespace WatchNext.MovieLists
{
	public class MovieListAPI
	{
		public required string ConnStr { get; set; }

		public async Task<IResult> CreateMovieList(RegisterMovieListRequest req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			if (!EnsureMinimumLength(req.list_title, 1))
			{
				return Results.BadRequest("List title must not be empty");
			}

			var res = await conn.QueryFirstOrDefaultAsync<MovieList>(
				@"INSERT INTO movie_lists (list_title, is_private)
				VALUES (@list_title, @is_private)
				RETURNING *;",
				new { req.list_title, req.is_private }
			);

			if (res == null)
			{
				return Results.BadRequest("Movie List creation failed.");
			}
			return Results.Ok(new { res });
		}

		public async Task<IResult> GetAllMovieLists()
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryAsync<MovieList>(
				"SELECT * FROM movie_lists;"
			);
			return Results.Ok(res);
		}

		public async Task<IResult> GetMovieListById(Guid id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var movieList = await conn.QueryAsync<MovieList>(
				"SELECT * FROM movie_lists WHERE id = @id", new { id });
			if (movieList == null)
			{
				return Results.NotFound("MovieList not found");
			}
			return Results.Ok(new { movieList });
		}

		public async Task<IResult> GetMovieListsByTitle(string listTitle)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var movieList = await conn.QueryAsync<MovieList>(
				"SELECT * FROM movie_lists WHERE list_title = @listTitle", new { listTitle });
			if (movieList == null)
			{
				return Results.NotFound("MovieList not found");
			}
			return Results.Ok(new { movieList });
		}

		public async Task<IResult> GetMovieListUsers(Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryAsync<UserFrontend>(
				@"SELECT u.*
				FROM users u
				JOIN user_movie_lists uml ON u.id = uml.user_id
				JOIN movie_lists ml ON uml.list_id = ml.id
				WHERE ml.id = @list_id",
			new { list_id });

			return Results.Ok(res);
		}

		public async Task<IResult> GetMovieListMovies(Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryAsync<Movie>(
				@"SELECT m.*
				FROM movies m
				JOIN movie_list_movies mlm ON m.id = mlm.movie_id
				JOIN movie_lists ml ON mlm.list_id = ml.id
				WHERE ml.id = @list_id;",
			new { list_id });

			return Results.Ok(res);
		}

		public async Task<IResult> UpdateMovieList(UpdateMovieListRequest req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var existingMovieList = await conn.QueryFirstOrDefaultAsync<MovieList>(
				"SELECT * FROM movie_lists WHERE id = @id", new { req.id });
			if (existingMovieList == null)
			{
				return Results.NotFound("Movie List not found");
			}

			string newListTitle = req.list_title ?? existingMovieList.list_title;
			bool newIsPrivate = req.is_private ?? existingMovieList.is_private;

			// Update MovieList
			var res = await conn.QueryFirstOrDefaultAsync<MovieList>(
				@"UPDATE movie_lists SET list_title = @newListTitle, is_private = @newIsPrivate
				WHERE id = @id
				RETURNING *;",
			new { newListTitle, newIsPrivate, req.id });

			return Results.Ok(res);
		}

		public async Task<IResult> AddUserToMovieList(UpdateUserMovieListRequest req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			bool isValid = await IsUserAndListValid(req);
			if (!isValid)
			{
				return Results.NotFound();
			}

			// Check to see if user is already associated with movie list
			var res1 = await conn.QueryFirstOrDefaultAsync(
				"SELECT * FROM user_movie_lists WHERE user_id=@user_id AND list_id=@list_id",
				new { req.user_id, req.list_id }
			);
			if (res1 != null)
			{
				return Results.Conflict("User already associated with movie list");
			}

			var res2 = await conn.QueryFirstOrDefaultAsync(
				@"INSERT INTO user_movie_lists (user_id, list_id) VALUES (@user_id, @list_id)",
				new { req.user_id, req.list_id }
			);
			return Results.Ok(res2);
		}

		public async Task<IResult> RemoveUserFromMovieList(UpdateUserMovieListRequest req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryFirstOrDefaultAsync(
				"DELETE FROM user_movie_lists WHERE user_id=@user_id AND list_id=@list_id;",
				new { req.user_id, req.list_id }
			);
			return Results.Ok(res);
		}

		public async Task<IResult> AddMovieToMovieList(UpdateMoviesMovieListRequest req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			bool isValid = await IsMovieAndListValid(req);
			if (!isValid)
			{
				return Results.NotFound();
			}

			// Check to see if movie is already associated with movie list
			var res1 = await conn.QueryFirstOrDefaultAsync(
				"SELECT * FROM movie_list_movies WHERE movie_id=@movie_id AND list_id=@list_id",
				new { req.movie_id, req.list_id }
			);
			if (res1 != null)
			{
				return Results.Conflict("Movie already associated with movie list");
			}

			var res2 = await conn.QueryFirstOrDefaultAsync(
				@"INSERT INTO movie_list_movies (movie_id, list_id) VALUES (@movie_id, @list_id)",
				new { req.movie_id, req.list_id }
			);
			return Results.Ok(res2);
		}

		public async Task<IResult> RemoveMovieFromMovieList(UpdateMoviesMovieListRequest req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryFirstOrDefaultAsync(
				"DELETE FROM movie_list_movies WHERE movie_id=@movie_id AND list_id=@list_id;",
				new { req.movie_id, req.list_id }
			);
			return Results.Ok(res);
		}

		public async Task<IResult> DeleteMovieList(Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var existingList = await conn.QueryFirstOrDefaultAsync<MovieList>(
				"SELECT * FROM movies WHERE id=@list_id", new {list_id});

			if (existingList == null)
			{
				return Results.NotFound("Movie not found");
			}

			// Delete associations in join tables first
			var res1 = await conn.QueryAsync(
				"DELETE FROM user_movie_lists WHERE list_id=@list_id", new { list_id });
			var res2 = await conn.QueryAsync(
				"DELETE FROM movie_list_movies WHERE list_id=@list_id", new { list_id });
			// Delete actual movie_list from db
			var res3 = await conn.QueryFirstOrDefaultAsync(
				"DELETE FROM movie_lists WHERE id = @list_id", new { list_id }
			);

			return Results.Ok("Movie list deleted");
		}

		// TODO: Make this more explicit than a bool so user knows what went wrong
		private async Task<bool> IsUserAndListValid(UpdateUserMovieListRequest req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var existingList = await conn.QueryFirstOrDefaultAsync<MovieList>(
				"SELECT * FROM movie_lists WHERE id=@list_id", new { req.list_id }
			);
			var existingUser = await conn.QueryFirstOrDefaultAsync<UserFrontend>(
				"SELECT * FROM users WHERE id=@user_id", new { req.user_id }
			);
			if (existingUser == null || existingList == null)
			{
				return false;
			}
			return true;
		}

		private async Task<bool> IsMovieAndListValid(UpdateMoviesMovieListRequest req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();
		
			var existingList = await conn.QueryFirstOrDefaultAsync<MovieList>(
				"SELECT * FROM movie_lists WHERE id=@list_id", new { req.list_id }
			);
			var existingMovie = await conn.QueryFirstOrDefaultAsync<Movie>(
				"SELECT * FROM movies WHERE id=@movie_id", new { req.movie_id }
			);
			if (existingMovie == null || existingList == null)
			{
				return false;
			}
			return true;
		}

		private static bool EnsureMinimumLength(string toCheck, int length)
		{
			return toCheck.Length >= length;
		}
	}
}
