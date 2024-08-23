using System.ComponentModel.DataAnnotations.Schema;

[Table("favorito")] // Especifica el nombre de la tabla aquí
public class Favorito
{
    public int Id { get; set; }
    public int Id_usuario { get; set; }
    public int Id_contenido { get; set; }
}

