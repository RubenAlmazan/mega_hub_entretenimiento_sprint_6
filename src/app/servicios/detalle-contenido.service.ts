import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleContenidoService {

  @Output() disparador = new EventEmitter<{ id_contenido: number, id_usuario: number }>();

  constructor() { }

  emitirDetalle(id_contenido: number, id_usuario: number): void {
    this.disparador.emit({ id_contenido, id_usuario });
  }
}
