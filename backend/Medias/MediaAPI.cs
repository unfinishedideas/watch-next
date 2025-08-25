using Dapper;
using Npgsql;
using WatchNext.WatchLists;

namespace WatchNext.Medias
{
	public class MediaAPI
	{
		public required string connStr { get; set; }
		
		public async Task<IResult> CreateMedia(MediaRegister newMedia)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			// Determine if the media is already in the db
			var existingMedia = await conn.QueryFirstOrDefaultAsync<Media>(
				@"SELECT * FROM medias WHERE title=@title;"
			, new { newMedia.title });

			if (existingMedia != null)
			{
				bool sametitle = newMedia.title == existingMedia.title;
				bool sameRelease = newMedia.release_date == existingMedia.release_date;
				bool samedirector = newMedia.director == existingMedia.director;
				//bool samegenre = newMedia.genre == existingMedia.genre;
				
				if (sametitle && sameRelease && samedirector)
				{
					return Results.Conflict("Media already in database");
				}
			}
			var res = await conn.QueryFirstOrDefaultAsync<Media>(
				@"INSERT INTO medias (title, release_date, director, genre)
				  VALUES (@title, @release_date, @director, @genre)
				  RETURNING *;"
				, new { newMedia.title, newMedia.release_date, newMedia.director, newMedia.genre });

			if (res == null) return Results.BadRequest("Media creation failed");

			return Results.Ok(res);
		}

		public async Task<IResult> GetAllMedias()
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var res = await conn.QueryAsync<Media>("SELECT * FROM medias;");
			return Results.Ok(res);
		}

		public async Task<IResult> GetMediaById(Guid media_id)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var media = await conn.QueryFirstOrDefaultAsync<Media>(
			"SELECT * FROM medias WHERE id = @media_id", new { media_id });
			if (media == null)
			{
				return Results.NotFound("Media not found");
			}
			return Results.Ok(new { media });
		}

		public async Task<IResult> GetMediasByTitle(string title)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var media = await conn.QueryAsync<Media>(
				"SELECT * FROM medias WHERE title=@title", new { title });
			if (media == null)
			{
				return Results.NotFound("Media not found");
			}
			return Results.Ok(new { media });
		}

		public async Task<IResult> GetMediasByDirector(string director)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var medias = await conn.QueryAsync<Media>(
				"SELECT * FROM medias WHERE director=@director", new { director });
			if (medias == null)
			{
				return Results.NotFound("No medias found");
			}
			return Results.Ok(new { medias });
		}

		public async Task<IResult> GetMediasByGenre(string genre)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var medias = await conn.QueryAsync<Media>(
				"SELECT * FROM medias WHERE genre=@genre", new { genre });
			if (medias == null)
			{
				return Results.NotFound("No medias found");
			}
			return Results.Ok(new { medias });
		}

		public async Task<IResult> GetMediasByYear(int year)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var medias = await conn.QueryAsync<Media>(
				"SELECT * FROM medias WHERE EXTRACT(YEAR FROM release_date) = @year", new { year });
			if (medias == null)
			{
				return Results.NotFound("No medias found");
			}
			return Results.Ok(new { medias });
		}

		public async Task<IResult> GetMediasByPartialTitle(string term)
		{
			if (string.IsNullOrWhiteSpace(term))
				return Results.Ok(new List<Media>());

			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			term = "%" + term + "%";
			var res = await conn.QueryAsync<Media>(
				@"SELECT * FROM medias WHERE title ILIKE @term LIMIT 10;",
				new { term });

			return Results.Ok(res);
		}

		public async Task<IResult> UpdateMedia(UpdateMediaRequest req)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var existingMedia = await conn.QueryFirstOrDefaultAsync<Media>(
				"SELECT * FROM medias WHERE id=@id", new {req.id});

			if (existingMedia == null)
			{
				return Results.NotFound("Media not found");
			}

			// Update media info
			string newtitle = req.title ?? existingMedia.title;
			string newdirector = req.director ?? existingMedia.director;
			string newgenre = req.genre ?? existingMedia.genre;
			DateTime newRelease = req.release_date ?? existingMedia.release_date;

			var res = await conn.QueryFirstOrDefaultAsync<Media>(
				@"UPDATE medias SET title=@newtitle, director=@newdirector, genre=@newgenre, release_date=@newRelease 
				WHERE id=@id RETURNING *;",
				new {newtitle, newdirector, newgenre, newRelease, req.id}
			);

			return Results.Ok(res);
		}

		public async Task<IResult> DeleteMedia(Guid media_id)
		{
			using var conn = new NpgsqlConnection(connStr);
			await conn.OpenAsync();

			var existingMedia = await conn.QueryFirstOrDefaultAsync<Media>(
				"SELECT * FROM medias WHERE id=@media_id", new {media_id});

			if (existingMedia == null)
			{
				return Results.NotFound("Media not found");
			}

			// Delete from watch_list_medias
			var res1 = await conn.QueryAsync(
				"DELETE FROM watch_list_medias WHERE media_id=@media_id", new { media_id });

			// Delete from medias
			var res2 = await conn.QueryFirstOrDefaultAsync(
				"DELETE FROM medias WHERE id=@media_id", new { media_id });

			return Results.Ok("Media deleted");	
		}
	}
}
