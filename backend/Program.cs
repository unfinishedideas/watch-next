using WatchNext.MovieLists;
using WatchNext.Movies;
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
MovieAPI mAPI = new() { connStr = connString };
MovieListAPI mlAPI = new() { connStr = connString };

// Users
app.MapPost("users/register", (UserRegister user) => uAPI.RegisterUser(user, pHasher));
app.MapPost("users/login", (LoginUserRequest req) => uAPI.LoginUser(req, pHasher));
app.MapPost("users/delete", (LoginUserRequest req) => uAPI.DeleteUser(req, pHasher));
app.MapGet("users/movie-lists", (Guid user_id) => uAPI.GetUserMovieLists(user_id));
app.MapGet("users/", (string email) => uAPI.GetUser(email));
app.MapGet("users/{id}", (Guid id) => uAPI.GetUserById(id));
app.MapGet("users/all", () => uAPI.GetUsers());
app.MapPut("users/", (UpdateUserRequest req) => uAPI.UpdateUser(req, pHasher));

// Movie Lists
app.MapPost("movie-lists/", (string listTitle) => mlAPI.CreateMovieList(listTitle));
app.MapPost("movie-lists/add-user", (UpdateUserMovieListRequest req) => mlAPI.AddUserToMovieList(req));
app.MapPost("movie-lists/remove-user", (UpdateUserMovieListRequest req) => mlAPI.RemoveUserFromMovieList(req));
app.MapGet("movie-lists/title", (string listTitle) => mlAPI.GetMovieListsByTitle(listTitle));
app.MapGet("movie-lists/{id}", (Guid id) => mlAPI.GetMovieListById(id));
app.MapGet("movie-lists/users", (Guid list_id) => mlAPI.GetMovieListUsers(list_id));
app.MapGet("movie-lists/movies", (Guid list_id) => mlAPI.GetMovieListMovies(list_id));
app.MapGet("movie-lists/all", () => mlAPI.GetMovieLists());
app.MapPut("movie-lists/", (UpdateMovieListRequest req) => mlAPI.UpdateMovieList(req));
app.MapDelete("movie-lists/", (Guid list_id) => mlAPI.DeleteMovieList(list_id));
// TODO: AddMovieToMovieList()
// TODO: RemoveMovieFromMovieList()

// Movies
app.MapPost("movies/", (MovieRegister req) => mAPI.CreateMovie(req));
app.MapGet("movies/{id}", (Guid id) => mAPI.GetMovieById(id));
app.MapGet("movies/title/{title}", (string title) => mAPI.GetMoviesByTitle(title));
app.MapGet("movies/director/{director}", (string director) => mAPI.GetMoviesByDirector(director));
app.MapGet("movies/genre/{genre}", (string genre) => mAPI.GetMoviesByGenre(genre));
app.MapGet("movies/year/{year}", (int year) => mAPI.GetMoviesByYear(year));
// TODO: UpdateMovie()
// TODO: DeleteMovie()

app.Run();
