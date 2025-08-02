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
				@"SELECT * FROM movies WHERE title=@title;"
			, new { newMovie.Title });

			if (existingMovie != null)
			{
				return Results.Conflict("Movie already in database");
			}
			var res = await conn.QueryFirstOrDefaultAsync<Movie>(
				@"INSERT INTO movies (title, release_date, director, genre)
				  VALUES (@title, @release_date, @director, @genre)
				  RETURNING *;"
				, new { newMovie.Title, newMovie.Release_Date, newMovie.Director, newMovie.Genre });

			if (res == null) return Results.BadRequest("Movie creation failed");

			return Results.Ok(res);
		}

		public async Task<IResult> GetMovieById(Guid movie_id)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var movieList = await conn.QueryAsync<Movie>(
			"SELECT * FROM movies WHERE id = @movie_id", new { movie_id });
			if (movieList == null)
			{
				return Results.NotFound("MovieList not found");
			}
			return Results.Ok(new { movieList });
		}

		// TODO: GetMovieByTitle()
		// TODO: UpdateMovie()
		// TODO: DeleteMovie()
	}
}
