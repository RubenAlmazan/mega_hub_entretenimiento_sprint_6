/* using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.IO;
using Swashbuckle.AspNetCore.Annotations;

var builder = WebApplication.CreateBuilder(args);

// Configuración de la ruta base y archivos de configuración
builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

// Agregar servicios al contenedor
builder.Services.AddControllers();

// Configuración de DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Agregar servicios de Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configuración de middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Habilitar Swagger
    app.UseSwaggerUI(); // Habilitar la interfaz de usuario de Swagger
}
else
{
    app.UseExceptionHandler("/Home/Error"); // Manejador de errores para producción
}

app.UseHttpsRedirection(); // Redirección a HTTPS
app.UseAuthorization(); // Autorización

app.MapControllers(); // Mapear los controladores

app.Run(); // Ejecutar la aplicación
*/

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.IO;
using Swashbuckle.AspNetCore.Annotations;

var builder = WebApplication.CreateBuilder(args);

// Configuración de la ruta base y archivos de configuración
builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

// Agregar servicios al contenedor
builder.Services.AddControllers();

// Configuración de DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Agregar servicios de Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuración de middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Habilitar Swagger
    app.UseSwaggerUI(); // Habilitar la interfaz de usuario de Swagger
}
else
{
    app.UseExceptionHandler("/Home/Error"); // Manejador de errores para producción
}

app.UseHttpsRedirection(); // Redirección a HTTPS
app.UseAuthorization(); // Autorización

// Configuración de CORS
app.UseCors("AllowAll");

app.MapControllers(); // Mapear los controladores

app.Run(); // Ejecutar la aplicación
