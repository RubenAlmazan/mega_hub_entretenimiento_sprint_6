using System.ComponentModel.DataAnnotations.Schema;

[Table("usuario")] // Especifica el nombre de la tabla aquí
public class Usuario
{
    public int Id { get; set; }
    public required string Correo { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
}
