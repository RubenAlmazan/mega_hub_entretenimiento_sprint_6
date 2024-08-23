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
  selector: 'app-genero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genero.component.html',
  styleUrl: './genero.component.css'
})
export class GeneroComponent implements OnInit{
  
  credencial: { id_usuario: number, nombre: string } | null = null;
  lista_genero: any;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private serviceContenidoService: ServiceContenidoService
  ) { }

  ngOnInit(){
    const storedData = this.storageService.getItem('dataGenero');
    this.credencial = storedData ? JSON.parse(storedData) : null;

    this.serviceContenidoService.getDataGenero().subscribe({
      next: (data) => {
        this.lista_genero = data;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });
  }

  GeneroEspecifico(id_genero: number, nombre_genero: string): void
  {
    // console.log(id_genero, nombre_genero)
    if (this.credencial) {

      const id_usuario = this.credencial.id_usuario;
      const nombre = this.credencial.nombre;

      const data = { id_genero: id_genero, id_usuario: id_usuario, nombre: nombre, nombre_genero: nombre_genero};
      this.storageService.setItem('dataGeneroEspecifico', JSON.stringify(data));

      //this.router.navigate(['/detalle']);
      window.location.href = '/contenido_genero';

    } else {
      console.error('item no está definido correctamente');
    }

  }
}
