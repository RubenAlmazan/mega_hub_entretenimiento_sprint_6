using System.ComponentModel.DataAnnotations.Schema;

[Table("genero")] // Especifica el nombre de la tabla aquí
public class Genero
{
    public int Id { get; set; }
    public required string Nombre { get; set; }
    public required string Imagen { get; set; }
}
