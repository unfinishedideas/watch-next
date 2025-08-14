using WatchNext.WatchLists;
using WatchNext.Movies;
using WatchNext.Users;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();

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
var app = builder.Build();

string? connString = builder.Configuration.GetConnectionString("Debug");
if (connString == null)
{
	throw new Exception("API: connStr not set!");
}

if (app.Environment.IsDevelopment())
{
	app.UseCors(DevCorsPolicy);
	app.MapOpenApi();   // navigate to http://localhost:{port}/openapi/v1.json to see the docs
}

PasswordHasher pHasher = new PasswordHasher();
// TODO: Make these static so we don't need instances!
UserAPI uAPI = new() { ConnStr = connString };
MovieAPI mAPI = new() { connStr = connString };
WatchListAPI wAPI = new() { ConnStr = connString };

// Users
app.MapPost("users/", (UserRegister user) => uAPI.RegisterUser(user, pHasher));
app.MapPost("users/login/", (LoginUserRequest req) => uAPI.LoginUser(req, pHasher));
app.MapPut("users/delete/", (LoginUserRequest req) => uAPI.DeleteUser(req, pHasher));
app.MapGet("users/", () => uAPI.GetAllUsers());
app.MapGet("users/{id}/", (Guid id) => uAPI.GetUserById(id));
app.MapGet("users/email/{email}/", (string email) => uAPI.GetUserByEmail(email));
app.MapGet("users/{id}/watch-lists/", (Guid id) => uAPI.GetUserWatchLists(id));
app.MapPut("users/", (UpdateUserRequest req) => uAPI.UpdateUser(req, pHasher));

// Watch Lists
app.MapPost("watch-lists/", (RegisterWatchListRequest req) => wAPI.CreateWatchList(req));
app.MapGet("watch-lists/", () => wAPI.GetAllWatchLists());
app.MapGet("watch-lists/{id}/", (Guid id) => wAPI.GetWatchListById(id));
app.MapGet("watch-lists/title/{listTitle}", (string listTitle) => wAPI.GetWatchListsByTitle(listTitle));
app.MapGet("watch-lists/{id}/users/", (Guid id) => wAPI.GetWatchListUsers(id));
app.MapGet("watch-lists/{id}/movies/", (Guid id) => wAPI.GetWatchListMovies(id));
app.MapPut("watch-lists/", (UpdateWatchListRequest req) => wAPI.UpdateWatchList(req));
app.MapPost("watch-lists/{id}/user/{user_id}", (Guid id, Guid user_id) => wAPI.AddUserToWatchList(id, user_id));
app.MapDelete("watch-lists/{id}/user/{user_id}", (Guid id, Guid user_id) => wAPI.RemoveUserFromWatchList(id, user_id));
app.MapPost("watch-lists/{id}/movie/{movie_id}", (Guid id, Guid movie_id) => wAPI.AddMovieToWatchList(id, movie_id));
app.MapDelete("watch-lists/{id}/movie/{movie_id}", (Guid id, Guid movie_id) => wAPI.RemoveMovieFromWatchList(id, movie_id));
app.MapPut("watch-lists/{id}/movie/{mov_id}", (Guid id, Guid mov_id, int new_spot) => wAPI.ReorderWatchListMovie(id, mov_id, new_spot));
app.MapPut("watch-lists/movie/update", (WatchListMovieUpdate req) => wAPI.UpdateWatchListMovie(req));
app.MapDelete("watch-lists/{id}", (Guid id) => wAPI.DeleteWatchList(id));

// Movies
app.MapPost("movies/", (MovieRegister req) => mAPI.CreateMovie(req));
app.MapGet("movies/", () => mAPI.GetAllMovies());
app.MapGet("movies/{id}/", (Guid id) => mAPI.GetMovieById(id));
app.MapGet("movies/title/{title}/", (string title) => mAPI.GetMoviesByTitle(title));
app.MapGet("movies/director/{director}/", (string director) => mAPI.GetMoviesByDirector(director));
app.MapGet("movies/genre/{genre}/", (string genre) => mAPI.GetMoviesByGenre(genre));
app.MapGet("movies/year/{year}/", (int year) => mAPI.GetMoviesByYear(year));
app.MapGet("movies/partial-title/{term}", (string term) => mAPI.GetMoviesByPartialTitle(term));
app.MapPut("movies/", (UpdateMovieRequest req) => mAPI.UpdateMovie(req));
app.MapDelete("movies/{id}", (Guid id) => mAPI.DeleteMovie(id));

app.Run();
