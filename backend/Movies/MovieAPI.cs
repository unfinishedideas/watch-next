using Dapper;
using Npgsql;
using WatchNext.WatchLists;

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
			, new { newMovie.title });

			if (existingMovie != null)
			{
				bool sametitle = newMovie.title == existingMovie.title;
				bool sameRelease = newMovie.release_date == existingMovie.release_date;
				bool samedirector = newMovie.director == existingMovie.director;
				//bool samegenre = newMovie.genre == existingMovie.genre;
				
				if (sametitle && sameRelease && samedirector)
				{
					return Results.Conflict("Movie already in database");
				}
			}
			var res = await conn.QueryFirstOrDefaultAsync<Movie>(
				@"INSERT INTO movies (title, release_date, director, genre)
				  VALUES (@title, @release_date, @director, @genre)
				  RETURNING *;"
				, new { newMovie.title, newMovie.release_date, newMovie.director, newMovie.genre });

			if (res == null) return Results.BadRequest("Movie creation failed");

			return Results.Ok(res);
		}

		public async Task<IResult> GetAllMovies()
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var res = await conn.QueryAsync<Movie>("SELECT * FROM movies;");
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
				"SELECT * FROM movies WHERE id=@id", new {req.id});

			if (existingMovie == null)
			{
				return Results.NotFound("Movie not found");
			}

			// Update movie info
			string newtitle = req.title ?? existingMovie.title;
			string newdirector = req.director ?? existingMovie.director;
			string newgenre = req.genre ?? existingMovie.genre;
			DateTime newRelease = req.release_date ?? existingMovie.release_date;

			var res = await conn.QueryFirstOrDefaultAsync<Movie>(
				@"UPDATE movies SET title=@newtitle, director=@newdirector, genre=@newgenre, release_date=@newRelease 
				WHERE id=@id RETURNING *;",
				new {newtitle, newdirector, newgenre, newRelease, req.id}
			);

			return Results.Ok(res);
		}

		public async Task<IResult> DeleteMovie(Guid movie_id)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var existingMovie = await conn.QueryFirstOrDefaultAsync<Movie>(
				"SELECT * FROM movies WHERE id=@movie_id", new {movie_id});

			if (existingMovie == null)
			{
				return Results.NotFound("Movie not found");
			}

			// Delete from watch_list_movies
			var res1 = await conn.QueryAsync(
				"DELETE FROM watch_list_movies WHERE movie_id=@movie_id", new { movie_id });

			// Delete from movies
			var res2 = await conn.QueryFirstOrDefaultAsync(
				"DELETE FROM movies WHERE id=@movie_id", new { movie_id });

			return Results.Ok("Movie deleted");	
		}
	}
}
