using Microsoft.EntityFrameworkCore;
using VertexPlusApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default") ?? "Data Source=leads.db"));

const string FrontendCorsPolicy = "FrontendCors";
builder.Services.AddCors(options =>
{
    // Wide open for local development so the static site (opened from file://, a dev
    // server, or a different port) can always reach the API. Restrict this to your
    // real site origin(s) before deploying to production.
    options.AddPolicy(FrontendCorsPolicy, policy =>
        policy.SetIsOriginAllowed(_ => true).AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// Ensure the SQLite database and schema exist — no migrations needed for this starter project.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(FrontendCorsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
