using Dapper;
using Npgsql;
using WatchNext.Movies;
using WatchNext.Users;

namespace WatchNext.WatchLists
{
	public class WatchListAPI
	{
		public required string ConnStr { get; set; }

		public async Task<IResult> CreateWatchList(RegisterWatchListRequest req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			if (!EnsureMinimumLength(req.title, 1))
			{
				return Results.BadRequest("List title must not be empty");
			}

			var res = await conn.QueryFirstOrDefaultAsync<WatchList>(
				@"INSERT INTO watch_lists (title, is_private)
				VALUES (@title, @is_private)
				RETURNING *;",
				new { req.title, req.is_private }
			);

			if (res == null)
			{
				return Results.BadRequest("Watch List creation failed.");
			}
			return Results.Ok(new { res });
		}

		public async Task<IResult> GetAllWatchLists()
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryAsync<WatchList>(
				"SELECT * FROM watch_lists;"
			);
			return Results.Ok(res);
		}

		public async Task<IResult> GetWatchListById(Guid id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var watchList = await conn.QueryFirstOrDefaultAsync<WatchList>(
				"SELECT * FROM watch_lists WHERE id = @id", new { id });
			if (watchList == null)
			{
				return Results.NotFound("WatchList not found");
			}
			return Results.Ok(watchList);
		}

		public async Task<IResult> GetWatchListsByTitle(string listTitle)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var watchList = await conn.QueryAsync<WatchList>(
				"SELECT * FROM watch_lists WHERE title = @listTitle", new { listTitle });
			if (watchList == null)
			{
				return Results.NotFound("No WatchLists found");
			}
			return Results.Ok(watchList);
		}

		public async Task<IResult> GetWatchListUsers(Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryAsync<UserFrontend>(
				@"SELECT u.*
				FROM users u
				JOIN user_watch_lists uml ON u.id = uml.user_id
				JOIN watch_lists ml ON uml.list_id = ml.id
				WHERE ml.id = @list_id",
			new { list_id });
			// TODO: detect if list doesn't exist

			return Results.Ok(res);
		}

		public async Task<IResult> GetWatchListMovies(Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryAsync<WatchListMovie>(
				@"SELECT m.*, movie_order, watched
				FROM movies m
				JOIN watch_list_movies mlm ON m.id = mlm.movie_id
				JOIN watch_lists ml ON mlm.list_id = ml.id
				WHERE ml.id = @list_id
				ORDER BY movie_order;",
			new { list_id });

			return Results.Ok(res);
		}

		public async Task<IResult> UpdateWatchList(UpdateWatchListRequest req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var existingWatchList = await conn.QueryFirstOrDefaultAsync<WatchList>(
				"SELECT * FROM watch_lists WHERE id = @id", new { req.id });
			if (existingWatchList == null)
			{
				return Results.NotFound("Watch List not found");
			}

			string newTitle = req.title ?? existingWatchList.title;
			bool newIsPrivate = req.is_private ?? existingWatchList.is_private;

			// Update WatchList
			var res = await conn.QueryFirstOrDefaultAsync<WatchList>(
				@"UPDATE watch_lists SET title = @newTitle, is_private = @newIsPrivate
				WHERE id = @id
				RETURNING *;",
			new { newTitle, newIsPrivate, req.id });

			return Results.Ok(res);
		}

		public async Task<IResult> AddUserToWatchList(Guid list_id, Guid user_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			bool isValid = await IsUserAndListValid(user_id, list_id);
			if (!isValid)
			{
				return Results.NotFound();
			}

			// Check to see if user is already associated with watch list
			var res1 = await conn.QueryFirstOrDefaultAsync(
				"SELECT * FROM user_watch_lists WHERE user_id=@user_id AND list_id=@list_id",
				new { user_id, list_id }
			);
			if (res1 != null)
			{
				return Results.Conflict("User already associated with watch list");
			}

			var res2 = await conn.QueryFirstOrDefaultAsync(
				@"INSERT INTO user_watch_lists (user_id, list_id) VALUES (@user_id, @list_id)",
				new { user_id, list_id }
			);
			return Results.Ok(res2);
		}

		public async Task<IResult> RemoveUserFromWatchList(Guid list_id, Guid user_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryFirstOrDefaultAsync(
				"DELETE FROM user_watch_lists WHERE user_id=@user_id AND list_id=@list_id;",
				new { user_id, list_id }
			);
			return Results.Ok(res);
		}

		public async Task<IResult> AddMovieToWatchList(Guid list_id, Guid movie_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			bool isValid = await IsMovieAndListValid(movie_id, list_id);
			if (!isValid)
			{
				return Results.NotFound();
			}

			// Check to see if movie is already associated with watch list
			var res1 = await conn.QueryFirstOrDefaultAsync(
				"SELECT * FROM watch_list_movies WHERE movie_id=@movie_id AND list_id=@list_id",
				new { movie_id, list_id }
			);
			if (res1 != null)
			{
				return Results.Conflict("Movie already associated with watch list");
			}
			// Get the number of movies to place the new one at the end
			var all_movies = await conn.QueryAsync<WatchListMovieUpdate>(
				@"SELECT * FROM watch_list_movies WHERE list_id=@list_id ORDER BY movie_order", new { list_id }
			);
			int new_movie_order = 0;
			if (all_movies != null)
			{
				new_movie_order = all_movies.Count() + 1;
			}

			var res2 = await conn.QueryFirstOrDefaultAsync(
				@"INSERT INTO watch_list_movies (movie_id, list_id, movie_order) VALUES (@movie_id, @list_id, @new_movie_order)",
				new { movie_id, list_id, new_movie_order }
			);

			return Results.Ok(res2);
		}

		public async Task<IResult> RemoveMovieFromWatchList(Guid list_id, Guid movie_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();
			// Get the movie's movie_order in order to fix list order after removal
			var movie = await conn.QueryFirstOrDefaultAsync<WatchListMovie>(
				@"SELECT * FROM watch_list_movies WHERE movie_id=@movie_id AND list_id=@list_id;",
				new { movie_id, list_id }
			);
			if (movie == null)
			{
				return Results.NotFound();
			}
			int old_spot = movie.movie_order;
			// Delete movie
			var res = await conn.QueryFirstOrDefaultAsync(
				"DELETE FROM watch_list_movies WHERE movie_id=@movie_id AND list_id=@list_id;",
				new { movie_id, list_id }
			);
			// Re-order movies in list
			var all_movies = await conn.QueryAsync<WatchListMovieUpdate>(
				@"SELECT * FROM watch_list_movies WHERE list_id=@list_id ORDER BY movie_order", new { list_id }
			);
			if (all_movies == null)
			{
				return Results.Ok();
			}
			foreach(WatchListMovieUpdate mov in all_movies)
			{
				if (mov.movie_order > old_spot)
				{
					mov.movie_order--;
					await conn.QueryAsync(
						@"UPDATE watch_list_movies
						SET movie_order = @movie_order
						WHERE list_id=@list_id AND movie_id=@movie_id;",
						new { mov.movie_order, list_id, mov.movie_id }
					);
				}
			}

			return Results.Ok(res);
		}

		public async Task<IResult> ReorderWatchListMovie(Guid list_id, Guid mov_id, int new_spot)
		{
			if (new_spot < 0)
			{
				return Results.BadRequest("New ranking must be greater than 0");
			}

			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			// Get target movie
			var target_movie = await conn.QueryFirstOrDefaultAsync<WatchListMovieUpdate>(@"SELECT * FROM watch_list_movies WHERE movie_id=@mov_id AND list_id=@list_id", new { mov_id, list_id });
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
				var movie_to_swap = await conn.QueryFirstOrDefaultAsync<WatchListMovieUpdate>(@"SELECT * FROM watch_list_movies WHERE list_id=@list_id AND movie_order=@new_spot;", new { list_id, new_spot });
				if (movie_to_swap == null)
				{
					return Results.BadRequest("No movie to swap with");
				}
				var res1 = await conn.QueryFirstOrDefaultAsync<WatchListMovieUpdate>(
					@"UPDATE watch_list_movies 
					SET movie_order = @new_spot	
					WHERE list_id=@list_id AND movie_id=@mov_id;",
					new { new_spot, list_id, mov_id }
				);
				var res2 = await conn.QueryFirstOrDefaultAsync<WatchListMovieUpdate>(
					@"UPDATE watch_list_movies 
					SET movie_order = @old_spot	
					WHERE list_id=@list_id AND movie_id=@movie_id;",
					new { old_spot, list_id, movie_to_swap.movie_id }
				);
				// TODO: Add error handling if this fails instead of just returning Results.Ok() (do this for every call in the api)
				return Results.Ok();
			}

			// Get all movie ids and their ranks
			var all_movies = await conn.QueryAsync<WatchListMovieUpdate>(
				@"SELECT * FROM watch_list_movies WHERE list_id=@list_id ORDER BY movie_order", new { list_id }
			);
			if (new_spot > all_movies.Count())
			{
				new_spot = all_movies.Count();
			}

			// Update all movies movie_order in the list
			if (new_spot > old_spot)
			{
				// decrement everthing between new_spot and old_spot
				foreach (WatchListMovieUpdate movie in all_movies)
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
						@"UPDATE watch_list_movies
						SET movie_order = @movie_order
						WHERE list_id=@list_id AND movie_id=@movie_id;",
						new { movie.movie_order, list_id, movie.movie_id }
					);
				}
			}
			else
			{
				// increment everything between new_spot and old_spot
				foreach (WatchListMovieUpdate movie in all_movies)
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
						@"UPDATE watch_list_movies
						SET movie_order = @movie_order
						WHERE list_id=@list_id AND movie_id=@movie_id;",
						new { movie.movie_order, list_id, movie.movie_id }
					);
				}
			}
			return Results.Ok();
		}

		public async Task<IResult> UpdateWatchListMovie(WatchListMovieUpdate req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryFirstOrDefaultAsync<WatchListMovie>(
				@"UPDATE watch_list_movies
				SET watched=@watched
				WHERE list_id=@list_id AND movie_id=@movie_id
				RETURNING *;",
				new { req.list_id, req.movie_id, req.watched});
			if (res == null)
			{
				return Results.NotFound("Unable to update movie, movie or list not found");	
			}
			return Results.Ok();
		}

		public async Task<IResult> DeleteWatchList(Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var existingList = await conn.QueryFirstOrDefaultAsync<WatchList>(
				"SELECT * FROM watch_lists WHERE id=@list_id", new { list_id });

			if (existingList == null)
			{
				return Results.NotFound("WatchList not found");
			}

			// Delete associations in join tables first
			var res1 = await conn.QueryAsync(
				"DELETE FROM user_watch_lists WHERE list_id=@list_id", new { list_id });
			var res2 = await conn.QueryAsync(
				"DELETE FROM watch_list_movies WHERE list_id=@list_id", new { list_id });
			// Delete actual watch_list from db
			var res3 = await conn.QueryFirstOrDefaultAsync(
				"DELETE FROM watch_lists WHERE id = @list_id", new { list_id }
			);

			return Results.Ok();
		}

		// TODO: Make this more explicit than a bool so user knows what went wrong
		private async Task<bool> IsUserAndListValid(Guid user_id, Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var existingList = await conn.QueryFirstOrDefaultAsync<WatchList>(
				"SELECT * FROM watch_lists WHERE id=@list_id", new { list_id }
			);
			var existingUser = await conn.QueryFirstOrDefaultAsync<UserFrontend>(
				"SELECT * FROM users WHERE id=@user_id", new { user_id }
			);
			if (existingUser == null || existingList == null)
			{
				return false;
			}
			return true;
		}

		private async Task<bool> IsMovieAndListValid(Guid movie_id, Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var existingList = await conn.QueryFirstOrDefaultAsync<WatchList>(
				"SELECT * FROM watch_lists WHERE id=@list_id", new { list_id }
			);
			var existingMovie = await conn.QueryFirstOrDefaultAsync<Movie>(
				"SELECT * FROM movies WHERE id=@movie_id", new { movie_id }
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
