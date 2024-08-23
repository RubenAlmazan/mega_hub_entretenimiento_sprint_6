import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceContenidoService {
  private apiContenido = 'http://localhost:5277/api/contenido'; // URL corregida de la API
  private apiUsuario = 'http://localhost:5277/api/usuarios';
  private apiGenero = 'http://localhost:5277/api/genero';
  private apiEliminado = 'http://localhost:5277/api/eliminado/buscar_eliminado';

  private apiBuscarContenido = 'http://localhost:5277/api/contenido/buscar_contenido'; // URL corregida de la API
  private apiInsertFavorito = 'http://localhost:5277/api/favorito/insertar_favorito'; // URL corregida de la API
  private apiDeleteContenido = 'http://localhost:5277/api/eliminado/insertar_eliminado'; // URL corregida de la API
  private apiBuscarContenidoGenero = 'http://localhost:5277/api/contenido/buscar_contenido_genero'; // URL corregida de la API
  private apiBuscarFavorito = 'http://localhost:5277/api/favorito/buscar_favorito'; // URL corregida de la API
  private apiEliminarFavorito = 'http://localhost:5277/api/favorito/eliminar_favorito'; // URL corregida de la API
  private apiRestaurarContenido = 'http://localhost:5277/api/eliminado/eliminar_eliminado'; // URL corregida de la API
  private apiInsertarUsuario = 'http://localhost:5277/api/usuarios/insertar_usuario';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    // Si no necesitas este método, puedes eliminarlo o ajustarlo
    return this.http.get<any>(this.apiUsuario); // URL de la API para usuarios
  }

  getDataPrincipal(): Observable<any> {
    return this.http.get<any>(this.apiContenido);
  }

  getDataGenero(): Observable<any> {
    return this.http.get<any>(this.apiGenero);
  }

  /*getDataBuscarContenido(id_contenido: any): Observable<any> {
    const url = `${this.apiBuscarContenido}/${id_contenido}`;
    // console.log('URL generada:', url);  // Asegúrate de que la URL es correcta
    return this.http.get<any>(url);
}*/

  InsertContenidoFavorito(id_contenido: number, id_usuario: number): Observable<any> {
    const url = `${this.apiInsertFavorito}?id_usuario=${id_usuario}&id_contenido=${id_contenido}`;
    //console.log(url)
    return this.http.get<any>(url);
  }

  deleteContenido(id_contenido: number, id_usuario: number): Observable<any> {
    const url = `${this.apiDeleteContenido}?id_usuario=${id_usuario}&id_contenido=${id_contenido}`;
    //console.log(url)
    return this.http.get<any>(url);
  }

  buscarContenidoGenero(id_genero: any): Observable<any> {
    const url = `${this.apiBuscarContenidoGenero}?id_genero=${id_genero}`;
    //console.log(url)
    return this.http.get<any>(url);
  }

  buscarFavoritos(id_genero: any): Observable<any> {
    const url = `${this.apiBuscarFavorito}?id_usuario=${id_genero}`;
    //console.log(url)
    return this.http.get<any>(url);
  }

  eliminarFavoritos(id_usuario: number, id_contenido: number): Observable<any> {
    const url = `${this.apiEliminarFavorito}?id_usuario=${id_usuario}&id_contenido=${id_contenido}`;
    return this.http.delete<any>(url);
}

eliminarContenido(id_usuario: number): Observable<any> {
  const url = `${this.apiRestaurarContenido}?id_usuario=${id_usuario}`;
  return this.http.delete<any>(url);
}

insertUsuario(nombre: string, correo: string, password: string): Observable<any> {
  const url = `${this.apiInsertarUsuario}?nombre_usuario=${nombre}&correo=${correo}&password=${password}`;
  //console.log(url)
  return this.http.get<any>(url);
}

buscarEliminado(id_genero: any): Observable<any> {
  const url = `${this.apiEliminado}?id_usuario=${id_genero}`;
  //console.log(url)
  return this.http.get<any>(url);
}









}
