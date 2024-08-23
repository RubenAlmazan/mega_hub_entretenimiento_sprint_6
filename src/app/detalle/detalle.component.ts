import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StorageService } from '../servicios/info.service';
import { ApiDataService } from '../api-data.service';
import { Router } from '@angular/router';
import { delay, tap, takeUntil } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';
import { ServiceContenidoService } from '../service-contenido.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  credencial: { id_contenido: number, id_usuario: number, nombre: string } | null = null;
  private unsubscribe$ = new Subject<void>();
  lista_detalle_contenido: any[] = [];  // Cambia `any` por el tipo adecuado
  lista_favoritos: any[] = [];  // Cambia `any` por el tipo adecuado
  showImage: boolean = false;

  constructor(
    private storageService: StorageService,
    private dataService: ApiDataService,
    private router: Router,
    private serviceContenidoService: ServiceContenidoService
  ) { }

  ngOnInit() {
    const storedData = this.storageService.getItem('dataContenido');
    this.credencial = storedData ? JSON.parse(storedData) : null;

    this.serviceContenidoService.getDataPrincipal().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (data) => {
        this.lista_detalle_contenido = data;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });

    if (this.credencial) {
      this.serviceContenidoService.buscarFavoritos(this.credencial.id_usuario).subscribe({
        next: (data) => {
          this.lista_favoritos = data.map((item: { id_contenido: number }) => item.id_contenido);
        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
    } 

  }

  agregarFavorito(id_contenido: any, id_usuario: any): void {

    if (this.lista_favoritos.includes(id_contenido)) {
      alert('Este contenido ya está en tu lista de favoritos');
    }
    else
    {
      this.showImage = true;

      of(id_contenido).pipe(
        delay(3000), 
        tap(() => {
          this.showImage = false;
          this.insertarTablaFavorito(id_contenido, id_usuario);
        })
      ).subscribe();
    }

  }

  insertarTablaFavorito(id_contenido: number, id_usuario: number): void {
    this.serviceContenidoService.InsertContenidoFavorito(id_contenido, id_usuario).subscribe({
      next: (response) => {
        console.log('Registro insertado correctamente:', response);
        alert('Favorito insertado correctamente');
        window.location.href = '/detalle';

      },
      error: (err) => {
        console.error('Error al insertar registro:', err);
        alert('Error al insertar favorito');
      }
    });
  }

  quitarContenido(id_contenido: any, id_usuario: any): void {

    if (this.lista_favoritos.includes(id_contenido)) {
      alert('No puedes eliminar este contenido, porque esta en tu lista de favoritos');
    }
    else
    {
      this.showImage = true;

      of(id_contenido).pipe(
        delay(3000), 
        tap(() => {

          this.showImage = false;
          this.eliminarTablaContenido(id_contenido, id_usuario);
        })
      ).subscribe();
    }

  }

  eliminarTablaContenido(id_contenido: number, id_usuario: number): void {
    this.serviceContenidoService.deleteContenido(id_contenido, id_usuario).subscribe({
      next: (response) => {
        console.log('Registro borrado correctamente:', response);
        alert('Este contenido ha sido eliminado correctamente de tu catálogo');
        window.location.href = '/main';

      },
      error: (err) => {
        console.error('Error al eliminar registro:', err);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

