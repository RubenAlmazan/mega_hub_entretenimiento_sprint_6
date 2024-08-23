using System.ComponentModel.DataAnnotations.Schema;

[Table("contenido")] // Especifica el nombre de la tabla aquí
public class Contenido
{
    public int Id { get; set; }
    public required string Clave { get; set; }
    public required string Tipo { get; set; }
    public required string Nombre { get; set; }
    public required string Imagen { get; set; }
    public required string Descripcion { get; set; }
    public required string Video { get; set; }
}

