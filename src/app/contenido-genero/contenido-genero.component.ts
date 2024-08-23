import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StorageService } from '../servicios/info.service';
import { ApiDataService } from '../api-data.service';
import { Router } from '@angular/router';
import { delay, tap, takeUntil } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';
import { ServiceContenidoService } from '../service-contenido.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-contenido-genero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contenido-genero.component.html',
  styleUrl: './contenido-genero.component.css'
})
export class ContenidoGeneroComponent implements OnInit {
  credencial: { id_genero: number, id_usuario: number, nombre: string, nombre_genero: string } | null = null;
  lista_contenido: any[] = []; // Inicializa como un array vacío
  lista_eliminado: any[] = [];
  lista_contenido_filtrada: any[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router,
    private serviceContenidoService: ServiceContenidoService
  ) { }

  ngOnInit(): void {
    const storedData = this.storageService.getItem('dataGeneroEspecifico');
    this.credencial = storedData ? JSON.parse(storedData) : null;

    if (this.credencial) {
      forkJoin({
        contenido: this.serviceContenidoService.buscarContenidoGenero(this.credencial.id_genero),
        eliminado: this.serviceContenidoService.buscarEliminado(this.credencial.id_usuario)
      }).subscribe({
        next: (results) => {
          this.lista_contenido = results.contenido;
          this.lista_eliminado = results.eliminado.map((item: { id_contenido: number }) => item.id_contenido);

          this.lista_contenido_filtrada = this.lista_contenido.filter(
            (item: { id: number }) => !this.lista_eliminado.includes(item.id)
          );
          
        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
    }
  }

  VerDetalle(id_contenido: number): void {
    console.log(id_contenido)
    if (this.credencial) {

      const id_usuario = this.credencial.id_usuario;
      const nombre = this.credencial.nombre;

      const data = { id_contenido: id_contenido, id_usuario: id_usuario, nombre: nombre };
      this.storageService.setItem('dataContenidoEspecifico', JSON.stringify(data));

      //this.router.navigate(['/detalle']);
      window.location.href = '/detalle_contenido_genero';

    } else {
      console.error('item no está definido correctamente');
    }
  }


}


