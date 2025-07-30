using Dapper;
using Npgsql;
using WatchNext.Users;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

UserAPI uAPI = new UserAPI();

string? connStr = builder.Configuration.GetConnectionString("Debug");
if (connStr == null)
{
	throw new Exception("API: connStr not set!");
}
PasswordHasher pHasher = new PasswordHasher();

app.MapPost("users/register", (UserRegister user) => uAPI.RegisterUser(user, connStr, pHasher));
app.MapPost("users/login", (LoginUserRequest req) => uAPI.LoginUser(req, connStr, pHasher));
app.MapGet("users/", (string email) => uAPI.GetUser(email, connStr));
app.MapPut("users/", (UpdateUserRequest req) => uAPI.UpdateUser(req, connStr, pHasher));

app.Run();




/*
TODO: DELETE THIS AS SOON AS FULL FUNCTIONALITY RETURNED
using WatchNext.DB;
using WatchNext.Users;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
PasswordHasher hasher = new PasswordHasher();   // TODO: Look into making a singleton instead

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

if (app.Environment.IsDevelopment())
{
    app.UseCors(DevCorsPolicy);
    app.MapOpenApi();   // navigate to http://localhost:{port}/openapi/v1.json to see the docs
}

// TODO: Look into turning these into builder services instead of app.map (see Users folder for start of that)
// USERS
app.MapGet("/users", () => WatchNextDB.GetUsers());
app.MapGet("/users/{id}", (Guid id) => WatchNextDB.GetUser(id));
app.MapPost("/users/login", (LoginUserRequest req) => WatchNextDB.LoginUser(req, hasher));
app.MapPost("/users", (CreateUserRequest req) => WatchNextDB.CreateUser(req, hasher)); 
app.MapPut("/users", (User update) => WatchNextDB.UpdateUser(update)); 
app.MapDelete("/users/{id}", (Guid id) => WatchNextDB.DeleteUser(id)); 

// MOVIES
app.MapGet("/movies", () => WatchNextDB.GetMovies());
app.MapGet("/movies/{id}", (Guid id) => WatchNextDB.GetMovie(id));
app.MapPost("/movies", (Movie movie) => WatchNextDB.CreateMovie(movie)); 
app.MapPut("/movies",(Movie update) => WatchNextDB.UpdateMovie(update)); 
app.MapDelete("/movies/{id}", (Guid id) => WatchNextDB.DeleteMovie(id)); 

// LISTS
app.MapGet("/lists", () => WatchNextDB.GetMovieLists());
app.MapGet("/lists/{id}", (Guid id) => WatchNextDB.GetMovieList(id));
app.MapPost("/lists", (MovieList list) => WatchNextDB.CreateMovieList(list)); 
app.MapPut("/lists", (MovieList update) => WatchNextDB.UpdateMovieList(update)); 
app.MapDelete("/lists/{id}", (Guid id) => WatchNextDB.DeleteMovieList(id)); 

app.Run();
*/
