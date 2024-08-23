using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

[Route("api/[controller]")]
[ApiController]
public class UsuariosController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public UsuariosController(ApplicationDbContext context)
  {
    _context = context;
  }

  /// <summary>
  /// Obtiene todos los usuarios.
  /// </summary>
  /// <returns>Una lista de usuarios.</returns>
  [HttpGet]
  [SwaggerOperation(Summary = "Obtiene todos los usuarios")]
  [SwaggerResponse(200, "Lista de usuarios", typeof(IEnumerable<Usuario>))]
  public async Task<ActionResult<IEnumerable<Usuario>>> ReadUsuarios()
  {
    return await _context.Usuarios.ToListAsync();
  }

  /// <summary>
  /// Obtiene un usuario por su Id.
  /// </summary>
  /// <param name="id">Id del usuario.</param>
  /// <returns>El usuario con el Id especificado.</returns>
  [HttpGet("buscar_usuario")]
  [SwaggerOperation(Summary = "Obtiene un usuario por su Id")]
  [SwaggerResponse(200, "El usuario con el Id especificado", typeof(object))]
  [SwaggerResponse(404, "No se encontró el usuario")]
  public async Task<ActionResult<Usuario>> ReadUsuarioUnico(int id)
  {
    var usuario = await _context.Usuarios.FindAsync(id);

    if (usuario == null)
    {
      return NotFound();
    }

    var response = new
    {
      Id = usuario.Id,
      Correo = usuario.Correo,
      Username = usuario.Username,
      Password = usuario.Password
    };

    return Ok(response);
  }

  /// <summary>
  /// Inserta un nuevo registro
  /// </summary>
  /// <param name="nombre_usuario">Nombre del usuario.</param>
  /// <param name="correo">Correo del usuario.</param>
  /// <param name="password">Contraseña del usuario.</param>
  /// <returns>El usuario con el Id especificado.</returns>
  [HttpGet("insertar_usuario")]
  [SwaggerOperation(Summary = "Insertar un nuevo usuario")]
  [SwaggerResponse(200, "El nuevo usuario ha sido insertado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se insertó el usuario")]
  public async Task<ActionResult<Usuario>> insertUsuario(
    string nombre_usuario,
    string correo,
    string password
  )
  {
    var usuario = new Usuario
    {
      Username = nombre_usuario,
      Correo = correo,
      Password = password
    };

    _context.Usuarios.Add(usuario);
    await _context.SaveChangesAsync();

    return Ok(usuario);
  }

  // Elimina un usuario
  /// <summary>
  /// Elimina un usuario por su Id.
  /// </summary>
  /// <param name="id">Id del usuario.</param>
  /// <returns>Confirmación de la eliminación del usuario.</returns>
  [HttpDelete("eliminar_usuario")]
  [SwaggerOperation(Summary = "Elimina un usuario por su Id")]
  [SwaggerResponse(200, "El usuario ha sido eliminado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se encontró el usuario")]
  public async Task<ActionResult<Usuario>> deleteUsuario(int id)
  {
    var usuario = await _context.Usuarios.FindAsync(id);

    if (usuario == null)
    {
      return NotFound();
    }

    _context.Usuarios.Remove(usuario);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Usuario eliminado correctamente" });
  }

  // Edita un usuario
  /// <summary>
  /// Actualiza un campo específico del usuario.
  /// </summary>
  /// <param name="id">Id del usuario.</param>
  /// <param name="nombre_usuario">Nuevo nombre del usuario.</param>
  /// <param name="correo">Nuevo correo del usuario.</param>
  /// <param name="password">Nueva contraseña del usuario.</param>
  /// <returns>Confirmación de la actualización del usuario.</returns>
  [HttpPut("actualizar")]
  [SwaggerOperation(Summary = "Actualiza un campo específico del usuario")]
  [SwaggerResponse(200, "El usuario ha sido actualizado correctamente", typeof(object))]
  [SwaggerResponse(404, "No se encontró el usuario")]
  public async Task<ActionResult> UpdateUsuario(
    int id,
    string nombre_usuario,
    string correo,
    string password
  )
  {
    var usuario = await _context.Usuarios.FindAsync(id);

    if (usuario == null)
    {
      return NotFound("Usuario no encontrado");
    }

    // Actualiza solo los campos que no son null
    if (!string.IsNullOrEmpty(nombre_usuario))
    {
      usuario.Username = nombre_usuario;
    }

    if (!string.IsNullOrEmpty(correo))
    {
      usuario.Correo = correo;
    }

    if (!string.IsNullOrEmpty(password))
    {
      usuario.Password = password;
    }

    _context.Usuarios.Update(usuario);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Usuario actualizado correctamente", usuario });
  }

  /// <summary>
  /// Obtiene un usuario por su Id y nombre.
  /// </summary>
  /// <param name="id">Id del usuario.</param>
  /// <param name="username">Nombre del usuario.</param>
  /// <returns>El usuario con el Id y nombre especificados.</returns>
  [HttpGet("buscar_conjunto_usuario")]
  [SwaggerOperation(Summary = "Obtiene un usuario por su Id y nombre")]
  [SwaggerResponse(200, "El usuario con el Id y nombre especificados", typeof(object))]
  [SwaggerResponse(404, "No se encontró el usuario")]
  public async Task<ActionResult<Usuario>> ReadMedioUsuario(int id, string username)
  {
    var usuario = await _context.Usuarios.FirstOrDefaultAsync(u =>
      u.Id == id && u.Username == username
    );

    if (usuario == null)
    {
      return NotFound();
    }

    var response = new
    {
      Id = usuario.Id,
      Correo = usuario.Correo,
      Username = usuario.Username,
      Password = usuario.Password
    };

    return Ok(response);
  }
}
