import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiDataService } from '../api-data.service';
import { StorageService } from '../servicios/info.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ServiceContenidoService } from '../service-contenido.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  data: any[] = []; // Especifica que es un array de cualquier tipo
  showImage: boolean = false;

  constructor(
    private dataService: ApiDataService,
    private storageService: StorageService,
    private router: Router,
    private serviceContenidoService: ServiceContenidoService

  ) { }

  ngOnInit(): void {
    this.serviceContenidoService.getData().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });
  }

  onSubmit(form: any): void {
    //console.log(form.name, form.password, form.correo);

    if (!form.name || !form.password || !form.correo) {
      alert('Por favor, ingrese un correo, nombre de usuario y/o contraseña para su registro');
      return;
    }
    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(form.name)) {
      alert('Verifique que su usuario esté correctamente escrito. Intentelo de nuevo');
      return;
    }

    const encontrado = this.data.some(item =>
      form.name === item.username || form.correo === item.correo
    );

    if (encontrado === true) {
      alert('Ese usuario y/o correo ya han sido registrados. Intentelo de nuevo. ');
      return;
    }

    // alert('Espere un momento. Se esta creando su cuenta en esta plataforma');
    this.showImage = true;

    of(encontrado === false).pipe(
      delay(3000), 

      tap(() => {
        this.showImage = false;
        this.registrarUsuario(form.name, form.correo, form.password); // Cambié username por correo
      })
    ).subscribe();

  }

  registrarUsuario(name: string, correo: string, password: string): void {
    
    this.serviceContenidoService.insertUsuario(name, correo, password).subscribe({
      next: (response) => {
          alert('Su cuenta ha sido creada exitosamente. Inicie sesion para acceder al sistema');
          window.location.href = '/inicio';
      },
      error: (err) => {
          console.error('Error al insertar registro:', err);
      }
  });
  

  
    
  }
}
