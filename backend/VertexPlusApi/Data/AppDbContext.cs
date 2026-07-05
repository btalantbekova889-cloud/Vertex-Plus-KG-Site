using Microsoft.EntityFrameworkCore;
using VertexPlusApi.Models;

namespace VertexPlusApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Lead> Leads => Set<Lead>();
}
