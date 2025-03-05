using WatchNext.DB;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
{
    builder.Services.AddCors(options =>
            {
            options.AddDefaultPolicy(
                    policy =>
                    {
                    policy.WithOrigins("*");
                    });
            });
}

var app = builder.Build();

// For now, just leaving these here in one big file until it gets complicated enough to move :)
// GET
app.MapGet("/users", () => WatchNextDB.GetUsers());
app.MapGet("/users/{id}", (int id) => WatchNextDB.GetUser(id));

app.MapGet("/lists", () => WatchNextDB.GetMovieLists());
app.MapGet("/lists/{id}", (int id) => WatchNextDB.GetMovieList(id));

app.MapGet("/movies", () => WatchNextDB.GetMovies());
app.MapGet("/movies/{id}", (int id) => WatchNextDB.GetMovie(id));

// POST
app.MapPost("/users", (User user) => WatchNextDB.CreateUser(user)); 
app.MapPost("/lists", (MovieList list) => WatchNextDB.CreateMovieList(list)); 
app.MapPost("/movies", (Movie movie) => WatchNextDB.CreateMovie(movie)); 

// UPDATE
app.MapPut("/users", (User update) => WatchNextDB.UpdateUser(update)); 
app.MapPut("/lists", (MovieList update) => WatchNextDB.UpdateMovieList(update)); 
app.MapPut("/movies",(Movie update) => WatchNextDB.UpdateMovie(update)); 

// DELETE
app.MapDelete("/users/{id}",  (int id) => WatchNextDB.DeleteUser(id)); 
app.MapDelete("/lists/{id}",  (int id) => WatchNextDB.DeleteMovieList(id)); 
app.MapDelete("/movies/{id}", (int id) => WatchNextDB.DeleteMovie(id)); 

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors();
}

app.Run();
