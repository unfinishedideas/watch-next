using WatchNext.DB;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

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

// USERS
app.MapGet("/users", () => WatchNextDB.GetUsers());
app.MapGet("/users/{id}", (Guid id) => WatchNextDB.GetUser(id));
app.MapPost("/users", (User user) => WatchNextDB.CreateUser(user)); 
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
