using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

[Route("api/[controller]")]
[ApiController]
public class EliminadoController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public EliminadoController(ApplicationDbContext context)
  {
    _context = context;
  }

  /// <summary>
  /// Obtiene todos los eliminados.
  /// </summary>
  /// <returns>Una lista de eliminados.</returns>
  [HttpGet]
  [SwaggerOperation(Summary = "Obtiene todos los eliminados")]
  [SwaggerResponse(200, "Lista de eliminados", typeof(IEnumerable<Eliminado>))]
  public async Task<ActionResult<IEnumerable<Eliminado>>> ReadEliminado()
  {
    return await _context.Eliminado.ToListAsync();
  }

  /// <summary>
/// Obtiene la lista de eliminados por el Id del usuario.
/// </summary>
/// <param name="id_usuario">Id del usuario.</param>
/// <returns>Lista de eliminados con el Id especificado.</returns>
[HttpGet("buscar_eliminado")]
[SwaggerOperation(Summary = "Obtiene la lista de eliminados de un usuario por su Id")]
[SwaggerResponse(200, "Lista de eliminados del usuario por el Id especificado", typeof(IEnumerable<Eliminado>))]
[SwaggerResponse(404, "No se encontró la lista de eliminados del usuario")]
public async Task<ActionResult<IEnumerable<Eliminado>>> ReadListaEliminado(int id_usuario)
{
    var eliminados = await _context.Eliminado
                                   .Where(e => e.Id_usuario == id_usuario)
                                   .ToListAsync();

    /*if (eliminados == null || !eliminados.Any())
    {
        return NotFound();
    }*/

    return Ok(eliminados);
}

  /// <summary>
  /// Inserta un nuevo eliminado
  /// </summary>
  /// <param name="id_usuario">Clave del contenido</param>
  /// <param name="id_contenido">Genero del contenido.</param>
  /// <returns>El contenido con el Id especificado.</returns>
  [HttpGet("insertar_eliminado")]
  [SwaggerOperation(Summary = "Insertar un nuevo eliminado")]
  [SwaggerResponse(200, "El nuevo eliminado ha sido insertado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se insertó el eliminado")]
  public async Task<ActionResult<Favorito>> insertEliminado(int id_usuario, int id_contenido)
  {
    var eliminado = new Eliminado { Id_contenido = id_contenido, Id_usuario = id_usuario };

    _context.Eliminado.Add(eliminado);
    await _context.SaveChangesAsync();

    return Ok(eliminado);
  }

  // Elimina un contenido
  /// <summary>
  /// Elimina un eliminado por su Id.
  /// </summary>
  /// <param name="id_usuario">Clave del contenido</param>
  /// <returns>Confirmación de la eliminación del contenido.</returns>
  [HttpDelete("eliminar_eliminado")]
[SwaggerOperation(Summary = "Elimina un eliminado por su Id")]
[SwaggerResponse(200, "El contenido ha sido eliminado correctamente", typeof(object))]
[SwaggerResponse(404, "No se encontró el contenido")]
public async Task<ActionResult> DeleteEliminado(int id_usuario)
{
    var eliminados = await _context.Eliminado.Where(e => e.Id_usuario == id_usuario).ToListAsync();

    if (eliminados.Any())
    {
        _context.Eliminado.RemoveRange(eliminados);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Contenido eliminado correctamente" });
    }

    return NotFound();
}

}
