using Dapper;
using Npgsql;
using WatchNext.Users;

namespace WatchNext.MovieLists
{
	public class MovieListAPI
	{
		public async Task<IResult> GetMovieListsByTitle(string listTitle, string connStr)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var movieList = await conn.QueryAsync<MovieList>(
				"SELECT * FROM movie_lists WHERE list_title = @listTitle", new { listTitle });
			if (movieList == null)
			{
				return Results.NotFound("MovieList not found");
			}
			return Results.Ok(new { movieList });
		}

		public async Task<IResult> GetMovieListById(Guid id, string connStr)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var movieList = await conn.QueryAsync<MovieList>(
				"SELECT * FROM movie_lists WHERE id = @id", new { id });
			if (movieList == null)
			{
				return Results.NotFound("MovieList not found");
			}
			return Results.Ok(new { movieList });
		}

		public async Task<IResult> GetMovieListUsers(Guid list_id, string connStr)
		{
			using var conn = new NpgsqlConnection(connStr);
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

		public async Task<IResult> CreateMovieList(string listTitle, string connStr)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			if (!EnsureMinimumLength(listTitle, 1))
			{
				return Results.BadRequest("List title must not be empty");
			}

			var res = await conn.QueryFirstOrDefaultAsync<MovieList>(
				@"INSERT INTO movie_lists (list_title)
				VALUES (@ListTitle)
				RETURNING id, list_title",
				new { listTitle }
			);

			if (res == null)
			{
				return Results.BadRequest("Movie List creation failed.");
			}
			return Results.Ok(new { res });
		}

		public async Task<IResult> UpdateMovieList(UpdateMovieListRequest req,  string connStr)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var existingMovieList = await conn.QueryFirstOrDefaultAsync<MovieList>(
				"SELECT * FROM movie_lists WHERE id = @id", new { req.id });
			if (existingMovieList == null)
			{
				return Results.NotFound("Movie List not found");
			}

			// Update MovieList
			var res = await conn.QueryFirstOrDefaultAsync<MovieList>(
				@"UPDATE movie_lists SET list_title = @listTitle WHERE id = @id
				RETURNING id, list_title;", 
			new { req.listTitle, req.id });

			return Results.Ok(res);
		}

		public async Task<IResult> DeleteMovieList(Guid list_id, string connStr)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

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

		private static bool EnsureMinimumLength(string toCheck, int length)
		{
			return toCheck.Length >= length;
		}
	}

	public class UpdateMovieListRequest()
	{
		public required Guid id { get; set; }
		public required string listTitle { get; set; }
	}
}
