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
				bool sameTitle = newMovie.Title == existingMovie.Title;
				bool sameRelease = newMovie.Release_Date == existingMovie.Release_Date;
				bool sameDirector = newMovie.Director == existingMovie.Director;
				//bool sameGenre = newMovie.Genre == existingMovie.Genre;
				
				if (sameTitle && sameRelease && sameDirector)
				{
					return Results.Conflict("Movie already in database");
				}
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

			var movie = await conn.QueryFirstOrDefaultAsync<Movie>(
			"SELECT * FROM movies WHERE id = @movie_id", new { movie_id });
			if (movie == null)
			{
				return Results.NotFound("Movie not found");
			}
			return Results.Ok(new { movie });
		}

		public async Task<IResult> GetMoviesByTitle(string title)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var movie = await conn.QueryAsync<Movie>(
				"SELECT * FROM movies WHERE title=@title", new { title });
			if (movie == null)
			{
				return Results.NotFound("Movie not found");
			}
			return Results.Ok(new { movie });
		}

		public async Task<IResult> GetMoviesByDirector(string director)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var movies = await conn.QueryAsync<Movie>(
				"SELECT * FROM movies WHERE director=@director", new { director });
			if (movies == null)
			{
				return Results.NotFound("No movies found");
			}
			return Results.Ok(new { movies });
		}

		public async Task<IResult> GetMoviesByGenre(string genre)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var movies = await conn.QueryAsync<Movie>(
				"SELECT * FROM movies WHERE genre=@genre", new { genre });
			if (movies == null)
			{
				return Results.NotFound("No movies found");
			}
			return Results.Ok(new { movies });
		}

		public async Task<IResult> GetMoviesByYear(int year)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var movies = await conn.QueryAsync<Movie>(
				"SELECT * FROM movies WHERE EXTRACT(YEAR FROM release_date) = @year", new { year });
			if (movies == null)
			{
				return Results.NotFound("No movies found");
			}
			return Results.Ok(new { movies });
		}

		public async Task<IResult> UpdateMovie(UpdateMovieRequest req)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var existingMovie = await conn.QueryFirstOrDefaultAsync<Movie>(
				"SELECT * FROM movies WHERE id=@id", new {req.Id});

			if (existingMovie == null)
			{
				return Results.NotFound("Movie not found");
			}

			// Update movie info
			string newTitle = req.Title ?? existingMovie.Title;
			string newDirector = req.Director ?? existingMovie.Director;
			string newGenre = req.Genre ?? existingMovie.Genre;
			DateTime newRelease = req.Release_Date ?? existingMovie.Release_Date;

			var res = await conn.QueryFirstOrDefaultAsync<Movie>(
				@"UPDATE movies SET title=@newTitle, director=@newDirector, genre=@newGenre, release_date=@newRelease 
				WHERE id=@id RETURNING *;",
				new {newTitle, newDirector, newGenre, newRelease, req.Id}
			);

			return Results.Ok(res);
		}
		// TODO: DeleteMovie()
	}
}
