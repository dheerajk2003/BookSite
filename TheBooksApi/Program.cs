using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TheBooksApi.Middleware;
using TheBooksApi.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<BooksContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("con")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(p => p.AddPolicy("corsPolicy", build =>
{
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corsPolicy");

app.UseWhen(context => context.Request.Path.StartsWithSegments("/api/BookInfoModels"), appBuilder =>
{
    appBuilder.UseMiddleware<IdValidationMiddleware>();
});


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
