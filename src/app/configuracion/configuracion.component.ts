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
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {

  constructor(private storageService: StorageService, private serviceContenidoService: ServiceContenidoService  ) { }
  credencial: { id_genero: number, id_usuario: number, nombre: string } | null = null;
  showImage: boolean = false;

  ngOnInit(){
    const storedData = this.storageService.getItem('dataConfiguracion');
    this.credencial = storedData ? JSON.parse(storedData) : null;

  }

  restaurarValores(id: any): void{

    this.showImage = true;

    of(id).pipe(
      delay(3000), 
      tap(() => {
          this.showImage = false;

          this.restaurarTablaEliminado(id);
      })
  ).subscribe();
  }

  restaurarTablaEliminado(id_usuario: any): void {
    // console.log('Si se pudo ', id_usuario);
    this.serviceContenidoService.eliminarContenido(id_usuario).subscribe({
      next: (response) => {
        // console.log('Registro insertado correctamente:', response);
        alert('Su vista de contenidos se ha reconfigurado a su estado inicial');
        window.location.href = '/main';

      },
      error: (err) => {
        console.error('Error al insertar registro:', err);
      }
    });
  
  }
  
}
