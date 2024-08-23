import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../servicios/info.service';
import { Router } from '@angular/router';
import { DetalleContenidoService } from '../servicios/detalle-contenido.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ServiceContenidoService } from '../service-contenido.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  credencial: { id: number, username: string } | null = null;
  lista_contenido: any;
  lista_genero: any;
  lista_eliminado: any;

  lista_contenido_filtrada: any;

  constructor(private storageService: StorageService, private dataService: ApiDataService, private router: Router, private detalle: DetalleContenidoService, private serviceContenidoService: ServiceContenidoService) { }

  ngOnInit() {
    this.credencial = this.storageService.getItem('dataKey');

    this.serviceContenidoService.getDataPrincipal().subscribe({
      next: (data) => {
        this.lista_contenido = data;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });

    this.serviceContenidoService.getDataGenero().subscribe({
      next: (data) => {
        this.lista_genero = data;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });

    if (this.credencial) {
      this.serviceContenidoService.buscarEliminado(this.credencial.id).subscribe({
        next: (data) => {
          this.lista_eliminado = data.map((item: { id_contenido: number }) => item.id_contenido);
          // console.log(this.lista_eliminado)
          this.lista_contenido_filtrada = this.lista_contenido.filter((item: { id: number }) => !this.lista_eliminado.includes(item.id));
          // console.log('-->', this.lista_contenido)
        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
    } 
    

  }

  ObtenerDetalle(id: number): void {
    if (this.credencial) {

      const id_usuario = this.credencial.id;
      const nombre = this.credencial.username;

      const data = { id_contenido: id, id_usuario: id_usuario, nombre: nombre };
      this.storageService.setItem('dataContenido', JSON.stringify(data));

      //this.router.navigate(['/detalle']);
      window.location.href = '/detalle';

    } else {
      console.error('item no está definido correctamente');
    }
  }



  VerGenero(): void {
    if (this.credencial) {

      const id_usuario = this.credencial.id;
      const nombre = this.credencial.username;

      const data = { id_usuario: id_usuario, nombre: nombre };
      this.storageService.setItem('dataGenero', JSON.stringify(data));

      //this.router.navigate(['/detalle']);
      window.location.href = '/genero';

    } else {
      console.error('item no está definido correctamente');
    }
  }

  VerFavoritos(): void {
    if (this.credencial) {

      const id_usuario = this.credencial.id;
      const nombre = this.credencial.username;

      const data = { id_usuario: id_usuario, nombre: nombre };
      this.storageService.setItem('dataFavorito', JSON.stringify(data));

      //this.router.navigate(['/detalle']);
      window.location.href = '/favoritos';

    } else {
      console.error('item no está definido correctamente');
    }
  }

  VerConfiguracion(): void {
    if (this.credencial) {

      const id_usuario = this.credencial.id;
      const nombre = this.credencial.username;

      const data = { id_usuario: id_usuario, nombre: nombre };
      this.storageService.setItem('dataConfiguracion', JSON.stringify(data));

      //this.router.navigate(['/detalle']);
      window.location.href = '/configuracion';

    } else {
      console.error('item no está definido correctamente');
    }
  }

}
