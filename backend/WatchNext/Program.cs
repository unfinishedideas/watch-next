var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

// For now, just leaving these here in one big file until it gets complicated enough to move :)
// GET
app.MapGet("/users", () => "Users: Not setup yet :)");
app.MapGet("/users/{id}", (int id) => $"Users: Not setup yet, but you passed id: {id}");

app.MapGet("/lists", () => "Lists: Not setup yet :)");
app.MapGet("/lists/{id}", (int id) => $"Lists: Not setup yet, but you passed id: {id}");

app.MapGet("/movies", () => "Movies: Not setup yet :)");
app.MapGet("/movies/{id}", (int id) => $"Movies: Not setup yet, but you passed id: {id}");

// POST
//app.MapPost("/users", ); 
//app.MapPost("/lists", ); 
//app.MapPost("/movies", ); 

// UPDATE
//app.MapPut("/users", ); 
//app.MapPut("/lists", ); 
//app.MapPut("/movies", ); 

// DELETE
//app.MapDelete("/users/{id}",  (int id) => ); 
//app.MapDelete("/lists/{id}",  (int id) => ); 
//app.MapDelete("/movies/{id}", (int id) => ); 


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.Run();
