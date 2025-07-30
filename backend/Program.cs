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

string? connStr = builder.Configuration.GetConnectionString("Debug");
if (connStr == null)
{
	throw new Exception("API: connStr not set!");
}

PasswordHasher pHasher = new PasswordHasher();
UserAPI uAPI = new UserAPI();
MovieListAPI mlAPI = new MovieListAPI();

// Users
app.MapPost("users/register", (UserRegister user) => uAPI.RegisterUser(user, connStr, pHasher));
app.MapPost("users/login", (LoginUserRequest req) => uAPI.LoginUser(req, connStr, pHasher));
app.MapGet("users/movie-lists", (Guid user_id) => uAPI.GetUserMovieLists(user_id, connStr));
app.MapGet("users/", (string email) => uAPI.GetUser(email, connStr));
app.MapGet("users/{id}", (Guid id) => uAPI.GetUserById(id, connStr));
app.MapPost("users/delete", (LoginUserRequest req) => uAPI.DeleteUser(req, pHasher, connStr));
app.MapPut("users/", (UpdateUserRequest req) => uAPI.UpdateUser(req, connStr, pHasher));
// TODO: DeleteUser()
// TODO: GetUsers()

// Movie Lists
app.MapGet("movie-lists/title", (string listTitle) => mlAPI.GetMovieListsByTitle(listTitle, connStr));
app.MapGet("movie-lists/{id}", (Guid id) => mlAPI.GetMovieListById(id, connStr));
app.MapGet("movie-lists/users", (Guid list_id) => mlAPI.GetMovieListUsers(list_id, connStr));
app.MapPost("movie-lists/", (string listTitle) => mlAPI.CreateMovieList(listTitle, connStr));
app.MapPut("movie-lists/", (UpdateMovieListRequest req) => mlAPI.UpdateMovieList(req, connStr));
app.MapDelete("movie-lists/", (Guid list_id) => mlAPI.DeleteMovieList(list_id, connStr));
// TODO: GetMovieLists()
// TODO: AddUserToMovieList()
// TODO: RemoveUserFromMovieList()
// TODO: AddMovieToMovieList()
// TODO: RemoveMovieFromMovieList()

// Movies
// TODO: CreateMovie()
// TODO: GetMovie()
// TODO: UpdateMovie()
// TODO: DeleteMovie()

app.Run();
