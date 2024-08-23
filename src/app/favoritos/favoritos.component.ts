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
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  credencial: {id_usuario: number, nombre: string } | null = null;
  lista_favoritos: any;
  lista_contenido: any;

  constructor(private storageService: StorageService, private dataService: ApiDataService,     private serviceContenidoService: ServiceContenidoService,     private router: Router) { }

  ngOnInit(): void {
    const storedData = this.storageService.getItem('dataFavorito');
    this.credencial = storedData ? JSON.parse(storedData) : null;

    if (this.credencial) {
      this.serviceContenidoService.buscarFavoritos(this.credencial.id_usuario).subscribe({
        next: (data) => {
          this.lista_favoritos = data;
        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
    } 

    this.serviceContenidoService.getDataPrincipal().subscribe({
      next: (data) => {
        this.lista_contenido = data;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });

  }

  detalleFavorito(id_contenido: number): void{
    console.log(id_contenido)

    if (this.credencial) {

      const id_usuario = this.credencial.id_usuario;
      const nombre = this.credencial.nombre;

      const data = { id_contenido: id_contenido, id_usuario: id_usuario, nombre: nombre };
      this.storageService.setItem('dataDetalleFavorito', JSON.stringify(data));

      //this.router.navigate(['/detalle']);
      window.location.href = '/detalle_favorito';

    } else {
      console.error('item no está definido correctamente');
    }

  }
  /*ngOnInit(): void {
    const dataFavorito = this.storageService.getItem('dataFavorito');
    if (dataFavorito) {
      this.item = JSON.parse(dataFavorito);
      console.log(this.item?.id_usuario); // Accede a id_usuario
    } 

    if (this.item) {
      this.dataService.getFavorito(this.item.id_usuario).subscribe({
        next: (data) => {
          this.lista = data;
        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
    } 
  }

  ObtenerDetalleFavorito(id: number): void{
    if (this.item) {
      const id_usuario = this.item.id_usuario;
      //console.log(id, id_usuario);
      const data = { id_usuario: id_usuario, id_contenido: id };
      this.storageService.setItem('dataDetalleFavorito', JSON.stringify(data));
      // Asegúrate de que 'dataContenido' coincida con el nombre en el DetalleComponent

      this.router.navigate(['/detalle_favorito']);
    } else {
      console.error('item no está definido correctamente');
    }
  } */

}
