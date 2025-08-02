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
UserAPI uAPI = new() { ConnStr = connString };
MovieAPI mAPI = new() { connStr = connString };
MovieListAPI mlAPI = new() { ConnStr = connString };

// Users
app.MapPost("users/", (UserRegister user) => uAPI.RegisterUser(user, pHasher));
app.MapPost("users/login/", (LoginUserRequest req) => uAPI.LoginUser(req, pHasher));
app.MapPost("users/delete/", (LoginUserRequest req) => uAPI.DeleteUser(req, pHasher));
app.MapGet("users/", () => uAPI.GetUsers());
app.MapGet("users/{id}/", (Guid id) => uAPI.GetUserById(id));
app.MapGet("users/email/{email}/", (string email) => uAPI.GetUserByEmail(email));
app.MapGet("users/{id}/movie-lists/", (Guid id) => uAPI.GetUserMovieLists(id));
app.MapPut("users/", (UpdateUserRequest req) => uAPI.UpdateUser(req, pHasher));

// Movie Lists
app.MapPost("movie-lists/", (string listTitle) => mlAPI.CreateMovieList(listTitle));
app.MapPost("movie-lists/add-user/", (UpdateUserMovieListRequest req) => mlAPI.AddUserToMovieList(req));
app.MapPost("movie-lists/remove-user/", (UpdateUserMovieListRequest req) => mlAPI.RemoveUserFromMovieList(req));
app.MapPost("movie-lists/add-movie/", (UpdateMoviesMovieListRequest req) => mlAPI.AddMovieToMovieList(req));
app.MapPost("movie-lists/remove-movie/", (UpdateMoviesMovieListRequest req) => mlAPI.RemoveMovieFromMovieList(req));
app.MapGet("movie-lists/", () => mlAPI.GetAllMovieLists());
app.MapGet("movie-lists/{id}/", (Guid id) => mlAPI.GetMovieListById(id));
app.MapGet("movie-lists/title/{listTitle}", (string listTitle) => mlAPI.GetMovieListsByTitle(listTitle));
app.MapGet("movie-lists/{id}/users/", (Guid id) => mlAPI.GetMovieListUsers(id));
app.MapGet("movie-lists/{id}/movies/", (Guid id) => mlAPI.GetMovieListMovies(id));
app.MapPut("movie-lists/", (UpdateMovieListRequest req) => mlAPI.UpdateMovieList(req));
app.MapDelete("movie-lists/{id}", (Guid id) => mlAPI.DeleteMovieList(id));

// Movies
app.MapPost("movies/", (MovieRegister req) => mAPI.CreateMovie(req));
app.MapGet("movies/{id}/", (Guid id) => mAPI.GetMovieById(id));
app.MapGet("movies/title/{title}/", (string title) => mAPI.GetMoviesByTitle(title));
app.MapGet("movies/director/{director}/", (string director) => mAPI.GetMoviesByDirector(director));
app.MapGet("movies/genre/{genre}/", (string genre) => mAPI.GetMoviesByGenre(genre));
app.MapGet("movies/year/{year}/", (int year) => mAPI.GetMoviesByYear(year));
app.MapPut("movies/", (UpdateMovieRequest req) => mAPI.UpdateMovie(req));
app.MapDelete("movies/{id}", (Guid id) => mAPI.DeleteMovie(id));

app.Run();
