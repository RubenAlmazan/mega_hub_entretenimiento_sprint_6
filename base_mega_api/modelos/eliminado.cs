using System.ComponentModel.DataAnnotations.Schema;

[Table("eliminado")] // Especifica el nombre de la tabla aquí
public class Eliminado
{
    public int Id { get; set; }
    public int Id_usuario { get; set; }
    public int Id_contenido { get; set; }
}

