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

			if (!EnsureMinimumLength(req.title, 1))
			{
				return Results.BadRequest("List title must not be empty");
			}

			var res = await conn.QueryFirstOrDefaultAsync<MovieList>(
				@"INSERT INTO movie_lists (list_title, is_private)
				VALUES (@list_title, @is_private)
				RETURNING *;",
				new { req.title, req.is_private }
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

			var res = await conn.QueryAsync<MovieListMovie>(
				@"SELECT m.*, movie_order
				FROM movies m
				JOIN movie_list_movies mlm ON m.id = mlm.movie_id
				JOIN movie_lists ml ON mlm.list_id = ml.id
				WHERE ml.id = @list_id
				ORDER BY movie_order;",
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

			string newListTitle = req.title ?? existingMovieList.title;
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
			// TODO: Reorder movie_order for every movie
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
			// TODO: Reorder movie_order for every movie
			return Results.Ok(res);
		}

		public async Task<IResult> ReorderMovie(Guid list_id, Guid mov_id, int new_spot)
		{
			if (new_spot < 0)
			{
				return Results.BadRequest("New ranking must be greater than 0");
			}

			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			// Get target movie
			var target_movie = await conn.QueryFirstOrDefaultAsync<MovieListMovieReorder>(@"SELECT * FROM movie_list_movies WHERE movie_id=@mov_id AND list_id=@list_id", new { mov_id, list_id });
			if (target_movie == null)
			{
				return Results.NotFound("Movie not found associated with this list");
			}
			int old_spot = target_movie.movie_order;
			if (new_spot == old_spot)
			{
				return Results.BadRequest("New ranking must differ from original");
			}

			// Check to see if it is an easy swap first
			if (Math.Abs(new_spot - old_spot) == 1)
			{
				var movie_to_swap = await conn.QueryFirstOrDefaultAsync<MovieListMovieReorder>(@"SELECT * FROM movie_list_movies WHERE list_id=@list_id AND movie_order=@new_spot;", new { list_id, new_spot });
				if (movie_to_swap == null)
				{
					return Results.BadRequest("No movie to swap with");
				}
				var res1 = await conn.QueryFirstOrDefaultAsync<MovieListMovieReorder>(
					@"UPDATE movie_list_movies 
					SET movie_order = @new_spot	
					WHERE list_id=@list_id AND movie_id=@mov_id;",
					new { new_spot, list_id, mov_id }
				);
				var res2 = await conn.QueryFirstOrDefaultAsync<MovieListMovieReorder>(
					@"UPDATE movie_list_movies 
					SET movie_order = @old_spot	
					WHERE list_id=@list_id AND movie_id=@movie_id;",
					new { old_spot, list_id, movie_to_swap.movie_id }
				);
				// TODO: Add error handling if this fails instead of just returning Results.Ok() (do this for every call in the api)
				return Results.Ok();
			}

			// Get all movie ids and their ranks
			var all_movies = await conn.QueryAsync<MovieListMovieReorder>(
				@"SELECT * FROM movie_list_movies WHERE list_id=@list_id ORDER BY movie_order", new { list_id }
			);
			if (new_spot > all_movies.Count())
			{
				new_spot = all_movies.Count();
			}

			// Update all movies movie_order in the list
			if (new_spot > old_spot)
			{
				// decrement everthing between new_spot and old_spot
				foreach (MovieListMovieReorder movie in all_movies)
				{
					if (movie.movie_id == target_movie.movie_id)
					{
						movie.movie_order = new_spot;
					}
					else if (movie.movie_order <= new_spot && movie.movie_order > old_spot)
					{
						movie.movie_order--;
					}
					await conn.QueryAsync(
						@"UPDATE movie_list_movies
						SET movie_order = @movie_order
						WHERE list_id=@list_id AND movie_id=@movie_id;",
						new { movie.movie_order, list_id, movie.movie_id }
					);
				}
			}
			else
			{
				// increment everything between new_spot and old_spot
				foreach (MovieListMovieReorder movie in all_movies)
				{
					if (movie.movie_id == target_movie.movie_id)
					{
						movie.movie_order = new_spot;
					}
					else if (movie.movie_order >= new_spot && movie.movie_order < old_spot)
					{
						movie.movie_order++;
					}
					await conn.QueryAsync(
						@"UPDATE movie_list_movies
						SET movie_order = @movie_order
						WHERE list_id=@list_id AND movie_id=@movie_id;",
						new { movie.movie_order, list_id, movie.movie_id }
					);
				}
			}
			return Results.Ok();
		}

		public async Task<IResult> DeleteMovieList(Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var existingList = await conn.QueryFirstOrDefaultAsync<MovieList>(
				"SELECT * FROM movies WHERE id=@list_id", new { list_id });

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

		// TODO: Move this to a helper function file
		private static bool EnsureMinimumLength(string toCheck, int length)
		{
			return toCheck.Length >= length;
		}
	}
}
