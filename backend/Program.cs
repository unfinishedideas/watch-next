using WatchNext.MovieLists;
using WatchNext.Users;

var builder = WebApplication.CreateBuilder(args);

// Fix CORS for development builds on the same machine
var DevCorsPolicy = "_devCorsPolicy";
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

PasswordHasher pHasher = new PasswordHasher();
UserAPI uAPI = new() { connStr = connString };
MovieListAPI mlAPI = new() { connStr = connString };

// Users
app.MapPost("users/register", (UserRegister user) => uAPI.RegisterUser(user, pHasher));
app.MapPost("users/login", (LoginUserRequest req) => uAPI.LoginUser(req, pHasher));
app.MapGet("users/movie-lists", (Guid user_id) => uAPI.GetUserMovieLists(user_id));
app.MapGet("users/", (string email) => uAPI.GetUser(email));
app.MapGet("users/{id}", (Guid id) => uAPI.GetUserById(id));
app.MapPost("users/delete", (LoginUserRequest req) => uAPI.DeleteUser(req, pHasher));
app.MapPut("users/", (UpdateUserRequest req) => uAPI.UpdateUser(req, pHasher));
app.MapGet("users/all", () => uAPI.GetUsers());

// Movie Lists
app.MapGet("movie-lists/title", (string listTitle) => mlAPI.GetMovieListsByTitle(listTitle));
app.MapGet("movie-lists/{id}", (Guid id) => mlAPI.GetMovieListById(id));
app.MapGet("movie-lists/users", (Guid list_id) => mlAPI.GetMovieListUsers(list_id));
app.MapGet("movie-lists/movies", (Guid list_id) => mlAPI.GetMovieListMovies(list_id));
app.MapPost("movie-lists/", (string listTitle) => mlAPI.CreateMovieList(listTitle));
app.MapPut("movie-lists/", (UpdateMovieListRequest req) => mlAPI.UpdateMovieList(req));
app.MapDelete("movie-lists/", (Guid list_id) => mlAPI.DeleteMovieList(list_id));
app.MapGet("movie-lists/all", () => mlAPI.GetMovieLists());
app.MapPost("movie-lists/add-user", (UpdateUserMovieListRequest req) => mlAPI.AddUserToMovieList(req));
app.MapPost("movie-lists/remove-user", (UpdateUserMovieListRequest req) => mlAPI.RemoveUserFromMovieList(req));
// TODO: AddMovieToMovieList()
// TODO: RemoveMovieFromMovieList()

// Movies
// TODO: CreateMovie()
// TODO: GetMovie()
// TODO: UpdateMovie()
// TODO: DeleteMovie()

app.Run();
