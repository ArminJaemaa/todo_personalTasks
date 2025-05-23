//dotnet add package BCrypt.Net-Next
//dotnet add package System.IdentityModel.Tokens.Jwt
//dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
//dotnet add package Microsoft.EntityFrameworkCore.Design
//dotnet ef migrations add InitialCreate
//dotnet ef database update





using TaskManagerAPI.Data;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true; // URL kõik väikeste tähtedega
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();
app.UseRouting();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();  // Access UI at /swagger
}

app.Run();