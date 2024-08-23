using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

[Route("api/[controller]")]
[ApiController]
public class FavoritoController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public FavoritoController(ApplicationDbContext context)
  {
    _context = context;
  }

  /// <summary>
  /// Obtiene todos los favoritos.
  /// </summary>
  /// <returns>Una lista de favoritos.</returns>
  [HttpGet]
  [SwaggerOperation(Summary = "Obtiene todos los favoritos")]
  [SwaggerResponse(200, "Lista de favoritos", typeof(IEnumerable<Favorito>))]
  public async Task<ActionResult<IEnumerable<Favorito>>> ReadFavorito()
  {
    return await _context.Favorito.ToListAsync();
  }

  /// <summary>
/// Obtiene la lista de favoritos de un usuario por su Id.
/// </summary>
/// <param name="id_usuario">Id del usuario.</param>
/// <returns>Lista de favoritos con el Id de usuario especificado.</returns>
[HttpGet("buscar_favorito")]
[SwaggerOperation(Summary = "Obtiene la lista de favoritos de un usuario por su Id")]
[SwaggerResponse(200, "Lista de favoritos con el Id de usuario", typeof(IEnumerable<object>))]
[SwaggerResponse(404, "No se encontró la lista de favoritos del usuario")]
public async Task<ActionResult<IEnumerable<object>>> ReadListaFavorito(int id_usuario)
{
    // Obtiene la lista de favoritos del usuario
    var favoritos = await _context.Favorito.Where(f => f.Id_usuario == id_usuario).ToListAsync();

    // Verifica si la lista está vacía
    if (!favoritos.Any())
    {
        return NotFound();
    }

    // Transforma la lista de favoritos en una lista de objetos anónimos
    var response = favoritos.Select(favorito => new
    {
        Id = favorito.Id,
        Id_contenido = favorito.Id_contenido,
        Id_usuario = favorito.Id_usuario
    });

    return Ok(response);
}


  /// <summary>
  /// Inserta un nuevo contenido
  /// </summary>
  /// <param name="id_usuario">Clave del contenido</param>
  /// <param name="id_contenido">Genero del contenido.</param>
  /// <returns>El contenido con el Id especificado.</returns>
  [HttpGet("insertar_favorito")]
  [SwaggerOperation(Summary = "Insertar un nuevo favorito")]
  [SwaggerResponse(200, "El nuevo favorito ha sido insertado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se insertó el favorito")]
  public async Task<ActionResult<Favorito>> insertFavorito(int id_usuario, int id_contenido)
  {
    var favorito = new Favorito { Id_contenido = id_contenido, Id_usuario = id_usuario };

    _context.Favorito.Add(favorito);
    await _context.SaveChangesAsync();

    return Ok(favorito);
  }

  // Elimina un contenido
  /// <summary>
  /// Elimina un contenido por su Id.
  /// </summary>
  /// <param name="id_usuario">Clave del contenido</param>
  /// <param name="id_contenido">Genero del contenido.</param>

  /// <returns>Confirmación de la eliminación del contenido.</returns>
  [HttpDelete("eliminar_favorito")]
  [SwaggerOperation(Summary = "Elimina un contenido por su Id")]
  [SwaggerResponse(200, "El contenido ha sido eliminado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se encontró el contenido")]
  public async Task<ActionResult<Favorito>> deleteFavorito(int id_usuario, int id_contenido)
  {
    var favorito = await _context.Favorito.FirstOrDefaultAsync(f =>
      f.Id_usuario == id_usuario && f.Id_contenido == id_contenido
    );

    if (favorito == null)
    {
      return NotFound();
    }

    _context.Favorito.Remove(favorito);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Favorito eliminado correctamente" });
  }
}
