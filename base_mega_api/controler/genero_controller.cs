using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

[Route("api/[controller]")]
[ApiController]
public class GeneroController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public GeneroController(ApplicationDbContext context)
  {
    _context = context;
  }

  /// <summary>
  /// Obtiene todos los generos.
  /// </summary>
  /// <returns>Una lista de generos.</returns>
  [HttpGet]
  [SwaggerOperation(Summary = "Obtiene todos los generos")]
  [SwaggerResponse(200, "Lista de generos", typeof(IEnumerable<Genero>))]
  public async Task<ActionResult<IEnumerable<Genero>>> ReadGenero()
  {
    return await _context.Genero.ToListAsync();
  }

  /// <summary>
  /// Obtiene un genero por su Id.
  /// </summary>
  /// <param name="id">Id del contenido.</param>
  /// <returns>El contenido con el Id especificado.</returns>
  [HttpGet("buscar_genero")]
  [SwaggerOperation(Summary = "Obtiene un genero por su Id")]
  [SwaggerResponse(200, "El genero con el Id especificado", typeof(object))]
  [SwaggerResponse(404, "No se encontró el genero")]
  public async Task<ActionResult<Genero>> ReadGeneroUnico(int id)
  {
    var genero = await _context.Genero.FindAsync(id);

    if (genero == null)
    {
      return NotFound();
    }

    var response = new
    {
        Id = genero.Id,
        Nombre = genero.Nombre,
        Imagen = genero.Imagen
    };

    return Ok(response);
  }

  /// <summary>
  /// Inserta un nuevo genero
  /// </summary>
  /// <param name="nombre">Nombre del genero</param>
  /// <param name="imagen">Imagen del genero</param>
  /// <returns>El contenido con el Id especificado.</returns>
  [HttpGet("insertar_genero")]
  [SwaggerOperation(Summary = "Insertar un nuevo genero")]
  [SwaggerResponse(200, "El nuevo genero ha sido insertado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se insertó el genero")]
  public async Task<ActionResult<Genero>> insertGenero(
    string nombre, string imagen
  )
  {
    var genero = new Genero
    {
        Nombre = nombre,
        Imagen = imagen,
    };

    _context.Genero.Add(genero);
    await _context.SaveChangesAsync();

    return Ok(genero);
  }

  // Edita un genero
  /// <summary>
  /// Actualiza un campo específico del genero.
  /// </summary>
  /// <param name="id">Id del genero.</param>
  /// <param name="nombre">Nombre del genero</param>
  /// <param name="imagen">Imagen del genero</param>
  /// <returns>Confirmación de la actualización del genero.</returns>
  [HttpPut("actualizar_genero")]
  [SwaggerOperation(Summary = "Actualiza un campo específico del genero")]
  [SwaggerResponse(200, "El genero ha sido actualizado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se encontró el genero")]
  public async Task<ActionResult> UpdateGenero(
    int id,
    string nombre,
    string imagen
  )
  {
    var genero = await _context.Genero.FindAsync(id);

    if (genero == null)
    {
      return NotFound("Contenido no encontrado");
    }


    if (!string.IsNullOrEmpty(nombre))
    {
      genero.Nombre = nombre;
    }

    if (!string.IsNullOrEmpty(imagen))
    {
      genero.Imagen = imagen;
    }

    _context.Genero.Update(genero);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Contenido actualizado correctamente", genero });
  }

  // Elimina un genero
  /// <summary>
  /// Elimina un genero por su Id.
  /// </summary>
  /// <param name="id">Id del genero.</param>
  /// <returns>Confirmación de la eliminación del contenido.</returns>
  [HttpDelete("eliminar_genero")]
  [SwaggerOperation(Summary = "Elimina un genero por su Id")]
  [SwaggerResponse(200, "El genero ha sido eliminado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se encontró el genero")]
  public async Task<ActionResult<Genero>> deleteGenero(int id)
  {
    var genero = await _context.Genero.FindAsync(id);

    if (genero == null)
    {
      return NotFound();
    }

    _context.Genero.Remove(genero);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Genero eliminado correctamente" });
  }

   /// <summary>
  /// Obtiene un genero por su Id y nombre.
  /// </summary>
  /// <param name="id">Id del genero.</param>
  /// <param name="nombre">Nombre del genero.</param>
  /// <returns>El genero con el Id y nombre especificados.</returns>
  [HttpGet("buscar_conjunto_genero")]
  [SwaggerOperation(Summary = "Obtiene un genero por su Id y nombre")]
  [SwaggerResponse(200, "El genero con el Id y nombre especificados", typeof(object))]
  [SwaggerResponse(404, "No se encontró el genero")]
  public async Task<ActionResult<Genero>> ReadMedioGenero(int id, string nombre)
  {
    var genero = await _context.Genero.FirstOrDefaultAsync(g =>
      g.Id == id && g.Nombre == nombre
    );

    if (genero == null)
    {
      return NotFound();
    }

    var response = new
    {
        Id = genero.Id,
        Nombre = genero.Nombre,
        Imagen = genero.Imagen,
    };

    return Ok(response);
  }
}