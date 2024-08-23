using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Contenido> Contenido { get; set; }
    public DbSet<Genero> Genero { get; set; }
    public DbSet<Favorito> Favorito { get; set; }
    public DbSet<Eliminado> Eliminado { get; set; }

}
