using Dapper;
using Npgsql;
using WatchNext.Medias;
using WatchNext.Users;

namespace WatchNext.WatchLists
{
	public class WatchListAPI
	{
		public readonly string ConnStr;
		public WatchListAPI(string connStr)
		{
			ConnStr = connStr;
		}

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

		// TODO: Maybe split up this behavior to other functions?
		public async Task<IResult> GetWatchListAndContentById(Guid id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var watchList = await conn.QueryFirstOrDefaultAsync<WatchList>(
				"SELECT * FROM watch_lists WHERE id = @id", new { id });
			if (watchList == null)
			{
				return Results.NotFound("WatchList not found");
			}

			var medias = await conn.QueryAsync<WatchListMedia>(
				@"SELECT m.*, media_order, watched
				FROM medias m
				JOIN watch_list_medias mlm ON m.id = mlm.media_id
				JOIN watch_lists ml ON mlm.list_id = ml.id
				WHERE ml.id = @id
				ORDER BY media_order;",
			new { id });

			var users = await conn.QueryAsync<UserFrontend>(
				@"SELECT u.*
				FROM users u
				JOIN user_watch_lists uml ON u.id = uml.user_id
				JOIN watch_lists ml ON uml.list_id = ml.id
				WHERE ml.id = @id",
			new { id });

			return Results.Ok(new { watchList, medias, users });
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

		public async Task<IResult> GetWatchListMedias(Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryAsync<WatchListMedia>(
				@"SELECT m.*, media_order, watched
				FROM medias m
				JOIN watch_list_medias mlm ON m.id = mlm.media_id
				JOIN watch_lists ml ON mlm.list_id = ml.id
				WHERE ml.id = @list_id
				ORDER BY media_order;",
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

		public async Task<IResult> AddMediaToWatchList(Guid list_id, Guid media_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			bool isValid = await IsMediaAndListValid(media_id, list_id);
			if (!isValid)
			{
				return Results.NotFound();
			}

			// Check to see if media is already associated with watch list
			var res1 = await conn.QueryFirstOrDefaultAsync(
				"SELECT * FROM watch_list_medias WHERE media_id=@media_id AND list_id=@list_id",
				new { media_id, list_id }
			);
			if (res1 != null)
			{
				return Results.Conflict("Media already associated with watch list");
			}
			// Get the number of medias to place the new one at the end
			var all_medias = await conn.QueryAsync<WatchListMediaUpdate>(
				@"SELECT * FROM watch_list_medias WHERE list_id=@list_id ORDER BY media_order", new { list_id }
			);
			int new_media_order = 0;
			if (all_medias != null)
			{
				new_media_order = all_medias.Count() + 1;
			}

			var res2 = await conn.QueryFirstOrDefaultAsync(
				@"INSERT INTO watch_list_medias (media_id, list_id, media_order) VALUES (@media_id, @list_id, @new_media_order)",
				new { media_id, list_id, new_media_order }
			);

			return Results.Ok(res2);
		}

		public async Task<IResult> RemoveMediaFromWatchList(Guid list_id, Guid media_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();
			// Get the media's media_order in order to fix list order after removal
			var media = await conn.QueryFirstOrDefaultAsync<WatchListMedia>(
				@"SELECT * FROM watch_list_medias WHERE media_id=@media_id AND list_id=@list_id;",
				new { media_id, list_id }
			);
			if (media == null)
			{
				return Results.NotFound();
			}
			int old_spot = media.media_order;
			// Delete media
			var res = await conn.QueryFirstOrDefaultAsync(
				"DELETE FROM watch_list_medias WHERE media_id=@media_id AND list_id=@list_id;",
				new { media_id, list_id }
			);
			// Re-order medias in list
			var all_medias = await conn.QueryAsync<WatchListMediaUpdate>(
				@"SELECT * FROM watch_list_medias WHERE list_id=@list_id ORDER BY media_order", new { list_id }
			);
			if (all_medias == null)
			{
				return Results.Ok();
			}
			foreach (WatchListMediaUpdate mov in all_medias)
			{
				if (mov.media_order > old_spot)
				{
					mov.media_order--;
					await conn.QueryAsync(
						@"UPDATE watch_list_medias
						SET media_order = @media_order
						WHERE list_id=@list_id AND media_id=@media_id;",
						new { mov.media_order, list_id, mov.media_id }
					);
				}
			}

			return Results.Ok(res);
		}

		public async Task<IResult> ReorderWatchListMedia(Guid list_id, Guid mov_id, int new_spot)
		{
			if (new_spot < 0)
			{
				return Results.BadRequest("New ranking must be greater than 0");
			}

			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			// Get target media
			var target_media = await conn.QueryFirstOrDefaultAsync<WatchListMediaUpdate>(@"SELECT * FROM watch_list_medias WHERE media_id=@mov_id AND list_id=@list_id", new { mov_id, list_id });
			if (target_media == null)
			{
				return Results.NotFound("Media not found associated with this list");
			}
			int old_spot = target_media.media_order;
			if (new_spot == old_spot)
			{
				return Results.BadRequest("New ranking must differ from original");
			}

			// Check to see if it is an easy swap first
			if (Math.Abs(new_spot - old_spot) == 1)
			{
				var media_to_swap = await conn.QueryFirstOrDefaultAsync<WatchListMediaUpdate>(@"SELECT * FROM watch_list_medias WHERE list_id=@list_id AND media_order=@new_spot;", new { list_id, new_spot });
				if (media_to_swap == null)
				{
					return Results.BadRequest("No media to swap with");
				}
				var res1 = await conn.QueryFirstOrDefaultAsync<WatchListMediaUpdate>(
					@"UPDATE watch_list_medias 
					SET media_order = @new_spot	
					WHERE list_id=@list_id AND media_id=@mov_id;",
					new { new_spot, list_id, mov_id }
				);
				var res2 = await conn.QueryFirstOrDefaultAsync<WatchListMediaUpdate>(
					@"UPDATE watch_list_medias 
					SET media_order = @old_spot	
					WHERE list_id=@list_id AND media_id=@media_id;",
					new { old_spot, list_id, media_to_swap.media_id }
				);
				// TODO: Add error handling if this fails instead of just returning Results.Ok() (do this for every call in the api)
				return Results.Ok();
			}

			// Get all media ids and their ranks
			var all_medias = await conn.QueryAsync<WatchListMediaUpdate>(
				@"SELECT * FROM watch_list_medias WHERE list_id=@list_id ORDER BY media_order", new { list_id }
			);
			if (new_spot > all_medias.Count())
			{
				new_spot = all_medias.Count();
			}

			// Update all medias media_order in the list
			if (new_spot > old_spot)
			{
				// decrement everthing between new_spot and old_spot
				foreach (WatchListMediaUpdate media in all_medias)
				{
					if (media.media_id == target_media.media_id)
					{
						media.media_order = new_spot;
					}
					else if (media.media_order <= new_spot && media.media_order > old_spot)
					{
						media.media_order--;
					}
					await conn.QueryAsync(
						@"UPDATE watch_list_medias
						SET media_order = @media_order
						WHERE list_id=@list_id AND media_id=@media_id;",
						new { media.media_order, list_id, media.media_id }
					);
				}
			}
			else
			{
				// increment everything between new_spot and old_spot
				foreach (WatchListMediaUpdate media in all_medias)
				{
					if (media.media_id == target_media.media_id)
					{
						media.media_order = new_spot;
					}
					else if (media.media_order >= new_spot && media.media_order < old_spot)
					{
						media.media_order++;
					}
					await conn.QueryAsync(
						@"UPDATE watch_list_medias
						SET media_order = @media_order
						WHERE list_id=@list_id AND media_id=@media_id;",
						new { media.media_order, list_id, media.media_id }
					);
				}
			}
			return Results.Ok();
		}

		public async Task<IResult> UpdateWatchListMedia(WatchListMediaUpdate req)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var res = await conn.QueryFirstOrDefaultAsync<WatchListMedia>(
				@"UPDATE watch_list_medias
				SET watched=@watched
				WHERE list_id=@list_id AND media_id=@media_id
				RETURNING *;",
				new { req.list_id, req.media_id, req.watched });
			if (res == null)
			{
				return Results.NotFound("Unable to update media, media or list not found");
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
				"DELETE FROM watch_list_medias WHERE list_id=@list_id", new { list_id });
			// Delete actual watch_list from db
			var res3 = await conn.QueryFirstOrDefaultAsync(
				"DELETE FROM watch_lists WHERE id = @list_id", new { list_id }
			);

			return Results.Ok();
		}

		public async Task<IResult> GetWatchListPreview(Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var watchList = await conn.QueryFirstOrDefaultAsync<WatchList>(
				"SELECT * FROM watch_lists WHERE id = @list_id", new { list_id });
			if (watchList == null)
			{
				return Results.NotFound("WatchList not found");
			}

			var thumbnails = await conn.QueryAsync<MediaPreview>(
				@"SELECT m.thumbnail, mlm.media_order, m.title
				FROM medias m
				JOIN watch_list_medias mlm ON m.id = mlm.media_id
				JOIN watch_lists ml ON mlm.list_id = ml.id
				WHERE ml.id = @list_id
				ORDER BY media_order
				LIMIT 5;", new { list_id }
			);

			return Results.Ok(new { watchList, thumbnails });
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

		private async Task<bool> IsMediaAndListValid(Guid media_id, Guid list_id)
		{
			using var conn = new NpgsqlConnection(ConnStr);
			await conn.OpenAsync();

			var existingList = await conn.QueryFirstOrDefaultAsync<WatchList>(
				"SELECT * FROM watch_lists WHERE id=@list_id", new { list_id }
			);
			var existingMedia = await conn.QueryFirstOrDefaultAsync<Media>(
				"SELECT * FROM medias WHERE id=@media_id", new { media_id }
			);
			if (existingMedia == null || existingList == null)
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
