using WatchNext.Medias;
using WatchNext.Users;
using WatchNext.WatchLists;

try
{
	var builder = WebApplication.CreateBuilder(args);
	builder.Services.AddOpenApi();
	builder.Services.AddHttpClient<TVDBService>(client =>
	{
		client.BaseAddress = new Uri("https://api4.thetvdb.com/v4/");
	});

	string? tvdbKeyEnvVar = Environment.GetEnvironmentVariable("TVDBKey");
	string? tvdbKey = builder.Configuration["TVDB:Key"];

	if (tvdbKey == null && tvdbKeyEnvVar == null)
	{
		throw new Exception("Missing TVDB API key. Please set this as an environment variable (name: TVDBKey) or in user-secrets (name: TVDB:Key)!");
	}

	// CORS policy for development builds on the same machine
	const string DevCorsPolicy = "_devCorsPolicy";
	if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
	{
		builder.Services.AddCors(options =>
		{
			options.AddPolicy(name: DevCorsPolicy,
				policy =>
				{
					policy
						.AllowAnyOrigin()
						.AllowAnyMethod()
						.AllowAnyHeader();
				});
		});
	}

	string? connString = builder.Configuration.GetConnectionString("Debug");
	if (connString == null)
	{
		throw new Exception("API: connStr not set!");
	}

	// Register the various APIs
	PasswordHasher pHasher = new PasswordHasher();
	builder.Services.AddSingleton(sp => new UserAPI(connString));
	builder.Services.AddSingleton(sp =>
	{
		var tvdbService = sp.GetRequiredService<TVDBService>();
		return new MediaAPI(tvdbService, connString);
	});
	builder.Services.AddSingleton(sp => new WatchListAPI(connString));

	var app = builder.Build();

	if (app.Environment.IsDevelopment())
	{
		app.UseCors(DevCorsPolicy);
		app.MapOpenApi();   // navigate to http://localhost:{port}/openapi/v1.json to see the docs
	}

	// API
	app.MapGet("/health", () => { return Results.Ok(); });  // TODO: an actual health check :P

	// Users
	app.MapPost("users/", (UserAPI uAPI, UserRegister user) => uAPI.RegisterUser(user, pHasher));
	app.MapPost("users/login/", (UserAPI uAPI, LoginUserRequest req) => uAPI.LoginUser(req, pHasher));
	app.MapPut("users/delete/", (UserAPI uAPI, LoginUserRequest req) => uAPI.DeleteUser(req, pHasher));
	app.MapGet("users/", (UserAPI uAPI) => uAPI.GetAllUsers());
	app.MapGet("users/{id}/", (UserAPI uAPI, Guid id) => uAPI.GetUserById(id));
	app.MapGet("users/email/{email}/", (UserAPI uAPI, string email) => uAPI.GetUserByEmail(email));
	app.MapGet("users/{id}/watch-lists/", (UserAPI uAPI, Guid id) => uAPI.GetUserWatchLists(id));
	app.MapPut("users/", (UserAPI uAPI, UpdateUserRequest req) => uAPI.UpdateUser(req, pHasher));

	// Watch Lists
	app.MapPost("watch-lists/", (WatchListAPI wAPI, RegisterWatchListRequest req) => wAPI.CreateWatchList(req));
	app.MapGet("watch-lists/", (WatchListAPI wAPI) => wAPI.GetAllWatchLists());
	app.MapGet("watch-lists/{id}/", (WatchListAPI wAPI, Guid id) => wAPI.GetWatchListById(id));
	app.MapGet("watch-lists/{id}/all", (WatchListAPI wAPI, Guid id) => wAPI.GetWatchListAndContentById(id));
	app.MapGet("watch-lists/title/{listTitle}", (WatchListAPI wAPI, string listTitle) => wAPI.GetWatchListsByTitle(listTitle));
	app.MapGet("watch-lists/{id}/users/", (WatchListAPI wAPI, Guid id) => wAPI.GetWatchListUsers(id));
	app.MapGet("watch-lists/{id}/medias/", (WatchListAPI wAPI, Guid id) => wAPI.GetWatchListMedias(id));
	app.MapPut("watch-lists/", (WatchListAPI wAPI, UpdateWatchListRequest req) => wAPI.UpdateWatchList(req));
	app.MapPost("watch-lists/{id}/user/{user_id}", (WatchListAPI wAPI, Guid id, Guid user_id) => wAPI.AddUserToWatchList(id, user_id));
	app.MapDelete("watch-lists/{id}/user/{user_id}", (WatchListAPI wAPI, Guid id, Guid user_id) => wAPI.RemoveUserFromWatchList(id, user_id));
	app.MapPost("watch-lists/{id}/medias/{media_id}", (WatchListAPI wAPI, Guid id, Guid media_id) => wAPI.AddMediaToWatchList(id, media_id));
	app.MapDelete("watch-lists/{id}/medias/{media_id}", (WatchListAPI wAPI, Guid id, Guid media_id) => wAPI.RemoveMediaFromWatchList(id, media_id));
	app.MapPut("watch-lists/{id}/medias/{mov_id}", (WatchListAPI wAPI, Guid id, Guid mov_id, int new_spot) => wAPI.ReorderWatchListMedia(id, mov_id, new_spot));
	app.MapPut("watch-lists/medias/update", (WatchListAPI wAPI, WatchListMediaUpdate req) => wAPI.UpdateWatchListMedia(req));
	app.MapDelete("watch-lists/{id}", (WatchListAPI wAPI, Guid id) => wAPI.DeleteWatchList(id));

	// Medias
	app.MapPost("medias/", (MediaAPI mAPI, MediaRegister req) => mAPI.CreateMedia(req));
	app.MapGet("medias/", (MediaAPI mAPI) => mAPI.GetAllMedias());
	app.MapGet("medias/{id}/", (MediaAPI mAPI, Guid id) => mAPI.GetMediaById(id));
	app.MapGet("medias/title/{title}/", (MediaAPI mAPI, string title) => mAPI.GetMediasByTitle(title));
	app.MapGet("medias/director/{director}/", (MediaAPI mAPI, string director) => mAPI.GetMediasByDirector(director));
	app.MapGet("medias/genre/{genre}/", (MediaAPI mAPI, string genre) => mAPI.GetMediasByGenre(genre));
	app.MapGet("medias/year/{year}/", (MediaAPI mAPI, int year) => mAPI.GetMediasByYear(year));
	app.MapGet("medias/partial-title/{term}", (MediaAPI mAPI, string term) => mAPI.GetMediasByPartialTitle(term));
	app.MapPut("medias/", (MediaAPI mAPI, UpdateMediaRequest req) => mAPI.UpdateMedia(req));
	app.MapDelete("medias/{id}", (MediaAPI mAPI, Guid id) => mAPI.DeleteMedia(id));
	// Medias - TVDB
	//app.MapGet("medias/imdb/{id}", (MediaAPI mAPI, string imdbId => mAPI.GetMediaByIMDB(id)));
	// TODO: Remove this, just for testing
	app.MapGet("/tvdb/search/{query}", async (string query, TVDBService tvdb) =>
	{
		var result = await tvdb.SearchSeriesByTitleAsync(query);
		return Results.Ok(result);
	});

	app.Run();
}
catch (Exception ex)
{
	Console.Error.WriteLine($"Something went wrong, exiting API.\nMessage: {ex.Message}");
	System.Environment.Exit(1);
}
