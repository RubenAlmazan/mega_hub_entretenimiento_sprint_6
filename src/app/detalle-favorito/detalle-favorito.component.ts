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
  selector: 'app-detalle-favorito',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './detalle-favorito.component.html',
  styleUrls: ['./detalle-favorito.component.css']
})
export class DetalleFavoritoComponent implements OnInit {

  credencial: { id_contenido: number, id_usuario: number, nombre: string } | null = null;
  lista_detalle_contenido: any;
  private unsubscribe$ = new Subject<void>();
  showImage: boolean = false;

  constructor(private storageService: StorageService, private serviceContenidoService: ServiceContenidoService,    private dataService: ApiDataService, private router: Router) { }

  ngOnInit() {
    const storedData = this.storageService.getItem('dataDetalleFavorito');
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
    
    
  }

  borrarFavorito(id_usuario: any, id_contenido: any): void {
    
    this.showImage = true;

    of(id_contenido).pipe(
      delay(3000), 
      tap(() => {
        this.showImage = false;
          this.borrarTablaFavorito(id_usuario, id_contenido);
      })
  ).subscribe();

  }

  borrarTablaFavorito(id_usuario: any, id_contenido: any): void {
    // console.log('Si se pudo ', id_usuario, id_contenido);
    this.serviceContenidoService.eliminarFavoritos(id_usuario, id_contenido).subscribe({
      next: (response) => {
        alert('El contenido ha sido eliminado correctamente de tus favoritos ')
        window.location.href = '/favoritos';


      },
      error: (err) => {
        console.error('Error al insertar registro:', err);
      }
    });

  }

}
