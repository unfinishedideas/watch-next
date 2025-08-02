using Dapper;
using Npgsql;
using WatchNext.MovieLists;

namespace WatchNext.Movies
{
	public class MovieAPI
	{
		public required string connStr { get; set; }
		
		public async Task<IResult> CreateMovie(MovieRegister newMovie)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			// Determine if the movie is already in the db
			var existingMovie = await conn.QueryFirstOrDefaultAsync<Movie>(
				@"SELECT * FROM movies WHERE movie_title=@movie_title;"
			, new { newMovie.movie_title });

			if (existingMovie != null)
			{
				return Results.Conflict("Movie already in database");
			}
			var res = await conn.QueryFirstOrDefaultAsync<Movie>(
				@"INSERT INTO movies (movie_title)
				  VALUES (@movie_title)
				  RETURNING id, movie_title;"
				, new { newMovie.movie_title });

			if (res == null) return Results.BadRequest("Movie creation failed");

			return Results.Ok(res);
		}
		// TODO: GetMovie()
		// TODO: UpdateMovie()
		// TODO: DeleteMovie()
	}
}
