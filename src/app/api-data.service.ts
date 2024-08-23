import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  private apiUrl = 'http://localhost:3000/';
  private apiUrlContenido = 'http://localhost:3000/contenido';
  private apiUrlDataContenido = 'http://localhost:3000/data_elemento';
  private apiUrlInsertarFavorito = 'http://localhost:3000/insert_favorito';
  private apiUrlElimiinarContenido = 'http://localhost:3000/delete_contenido';
  private apiUrlFavorito = 'http://localhost:3000/favorito';
  private apiUrlDeleteFavorito = 'http://localhost:3000/delete_favorito';
  private apiUrlResetCatalogo = 'http://localhost:3000/reset_catalogo';
  private apiUrlInsertarRegistro = 'http://localhost:3000/insertar_registro';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getDataContenido(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlContenido}?id=${id}`);  // Usa parámetros de consulta
  }
  getDataElemento(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlDataContenido}?id=${id}`);  // Usa parámetros de consulta
  }

  insertFavorito(idContenido: number, idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlInsertarFavorito}?contenido=${idContenido}&usuario=${idUsuario}`);
  }

  deleteContenido(idContenido: number, idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlElimiinarContenido}?contenido=${idContenido}&usuario=${idUsuario}`);
  }

  getFavorito(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlFavorito}?id=${id}`);  // Usa parámetros de consulta
  }

  deleteFavorito(idContenido: number, idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlDeleteFavorito}?contenido=${idContenido}&usuario=${idUsuario}`);
  }

  resetCatalogo(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlResetCatalogo}?id=${idUsuario}`);
  }

  insertRegistro(name: string, correo: string, password: string): Observable<any> {
    const body = { name, correo, password };
    return this.http.post<any>(this.apiUrlInsertarRegistro, body);
}
  
  

  
}
