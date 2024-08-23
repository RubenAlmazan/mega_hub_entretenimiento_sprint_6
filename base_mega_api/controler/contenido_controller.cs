using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

[Route("api/[controller]")]
[ApiController]
public class ContenidoController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public ContenidoController(ApplicationDbContext context)
  {
    _context = context;
  }

  /// <summary>
  /// Obtiene todos los contenidos.
  /// </summary>
  /// <returns>Una lista de contenidos.</returns>
  [HttpGet]
  [SwaggerOperation(Summary = "Obtiene todos los contenidos")]
  [SwaggerResponse(200, "Lista de contenidos", typeof(IEnumerable<Contenido>))]
  public async Task<ActionResult<IEnumerable<Contenido>>> ReadContenido()
  {
    return await _context.Contenido.ToListAsync();
  }

  /// <summary>
  /// Obtiene un contenido por su Id.
  /// </summary>
  /// <param name="id">Id del contenido.</param>
  /// <returns>El contenido con el Id especificado.</returns>
  [HttpGet("buscar_contenido")]
  [SwaggerOperation(Summary = "Obtiene un contenido por su Id")]
  [SwaggerResponse(200, "El contenido con el Id especificado", typeof(object))]
  [SwaggerResponse(404, "No se encontró el contenido")]
  public async Task<ActionResult<Contenido>> ReadContenidoUnico(int id)
  {    
    var contenido = await _context.Contenido.FindAsync(id);

    if (contenido == null)
    {
      return NotFound();
    }

    var response = new
    {
        Id = contenido.Id,
        Clave = contenido.Clave,
        Tipo = contenido.Tipo,
        Nombre = contenido.Nombre,
        Imagen = contenido.Imagen,
        Descripcion = contenido.Descripcion,
        Video = contenido.Video
    };

    return Ok(response);
  }

  /// <summary>
  /// Inserta un nuevo contenido
  /// </summary>
  /// <param name="clave">Clave del contenido</param>
  /// <param name="tipo">Genero del contenido.</param>
  /// <param name="nombre">Nombre del contenido</param>
  /// <param name="imagen">imagen del contenido</param>
  /// <param name="descripcion">descripcion del contenido</param>
  /// <param name="video">video / trailer del  contenido</param>
  /// <returns>El contenido con el Id especificado.</returns>
  [HttpGet("insertar_contenido")]
  [SwaggerOperation(Summary = "Insertar un nuevo contenido")]
  [SwaggerResponse(200, "El nuevo contenido ha sido insertado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se insertó el contenido")]
  public async Task<ActionResult<Contenido>> insertContenido(
    string clave,
    string tipo,
    string nombre,
    string imagen,
    string descripcion,
    string video
  )
  {
    var contenido = new Contenido
    {
        Clave = clave,
        Tipo = tipo,
        Nombre = nombre,
        Imagen = imagen,
        Descripcion = descripcion,
        Video = video
    };

    _context.Contenido.Add(contenido);
    await _context.SaveChangesAsync();

    return Ok(contenido);
  }

  // Edita un usuario
  /// <summary>
  /// Actualiza un campo específico del usuario.
  /// </summary>
  /// <param name="id">Id del Contenido.</param>
  /// <param name="clave">Clave del contenido</param>
  /// <param name="tipo">Genero del contenido.</param>
  /// <param name="nombre">Nombre del contenido</param>
  /// <param name="imagen">imagen del contenido</param>
  /// <param name="descripcion">descripcion del contenido</param>
  /// <param name="video">video / trailer del  contenido</param>
  /// <returns>Confirmación de la actualización del usuario.</returns>
  [HttpPut("actualizar_contenido")]
  [SwaggerOperation(Summary = "Actualiza un campo específico del contenido")]
  [SwaggerResponse(200, "El contenido ha sido actualizado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se encontró el usuario")]
  public async Task<ActionResult> UpdateContenido(
    int id,
    string clave,
    string tipo,
    string nombre,
    string imagen,
    string descripcion,
    string video
  )
  {
    var contenido = await _context.Contenido.FindAsync(id);

    if (contenido == null)
    {
      return NotFound("Contenido no encontrado");
    }

    // Actualiza solo los campos que no son null
    if (!string.IsNullOrEmpty(clave))
    {
      contenido.Clave = clave;
    }

    if (!string.IsNullOrEmpty(tipo))
    {
      contenido.Tipo = tipo;
    }

    if (!string.IsNullOrEmpty(nombre))
    {
      contenido.Nombre = nombre;
    }

    if (!string.IsNullOrEmpty(imagen))
    {
      contenido.Imagen = imagen;
    }

    if (!string.IsNullOrEmpty(descripcion))
    {
      contenido.Descripcion = descripcion;
    }

    if (!string.IsNullOrEmpty(video))
    {
      contenido.Video = video;
    }


    _context.Contenido.Update(contenido);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Contenido actualizado correctamente", contenido });
  }

  // Elimina un contenido
  /// <summary>
  /// Elimina un contenido por su Id.
  /// </summary>
  /// <param name="id">Id del contenido.</param>
  /// <returns>Confirmación de la eliminación del contenido.</returns>
  [HttpDelete("eliminar_contenido")]
  [SwaggerOperation(Summary = "Elimina un contenido por su Id")]
  [SwaggerResponse(200, "El contenido ha sido eliminado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se encontró el contenido")]
  public async Task<ActionResult<Contenido>> deleteContenido(int id)
  {
    var contenido = await _context.Contenido.FindAsync(id);

    if (contenido == null)
    {
      return NotFound();
    }

    _context.Contenido.Remove(contenido);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Usuario eliminado correctamente" });
  }

  /// <summary>
  /// Obtiene un contenido por su Id y clave.
  /// </summary>
  /// <param name="id">Id del usuario.</param>
  /// <param name="clave">Nombre del usuario.</param>
  /// <returns>El usuario con el Id y nombre especificados.</returns>
  [HttpGet("buscar_conjunto_contenido")]
  [SwaggerOperation(Summary = "Obtiene un contenido por su Id y clave")]
  [SwaggerResponse(200, "El contenido con el Id y clave especificados", typeof(object))]
  [SwaggerResponse(404, "No se encontró el contenodo")]
  public async Task<ActionResult<Contenido>> ReadMedioContendo(int id, string clave)
  {
    var contenido = await _context.Contenido.FirstOrDefaultAsync(c =>
      c.Id == id && c.Clave == clave
    );

    if (contenido == null)
    {
      return NotFound();
    }

    var response = new
    {
        Id = contenido.Id,
        Clave = contenido.Clave,
        Tipo = contenido.Tipo,
        Nombre = contenido.Nombre,
        Imagen = contenido.Imagen,
        Descripcion = contenido.Descripcion,
        Video = contenido.Video
    };

    return Ok(response);
  }

  
/// <summary>
/// Obtiene contenidos por su Id de género.
/// </summary>
/// <param name="id_genero">Id del género.</param>
/// <returns>Lista de contenidos con el Id de género especificado.</returns>
[HttpGet("buscar_contenido_genero")]
[SwaggerOperation(Summary = "Obtiene contenidos por su Id de género")]
[SwaggerResponse(200, "Lista de contenidos con el Id de género especificado", typeof(IEnumerable<object>))]
[SwaggerResponse(404, "No se encontraron contenidos")]
public async Task<ActionResult<IEnumerable<object>>> ReadContenidoPorGenero(string id_genero)
{
    // Obtiene todos los contenidos que coinciden con el id_genero
    var contenidos = await _context.Contenido.Where(c => c.Tipo == id_genero).ToListAsync();

    // Verifica si la lista está vacía
    if (!contenidos.Any())
    {
        return NotFound();
    }

    // Transforma la lista de contenidos en una lista de objetos anónimos
    var response = contenidos.Select(contenido => new
    {
        Id = contenido.Id,
        Clave = contenido.Clave,
        Tipo = contenido.Tipo,
        Nombre = contenido.Nombre,
        Imagen = contenido.Imagen,
        Descripcion = contenido.Descripcion,
        Video = contenido.Video
    });

    return Ok(response);
}

}
