import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../servicios/info.service';
import { Router } from '@angular/router';
import { ServiceContenidoService } from '../service-contenido.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data_usuario: any[] = []; 

  constructor(
    private storageService: StorageService,
    private router: Router,
    private serviceContenidoService: ServiceContenidoService
  ) { }

  ngOnInit(): void {
    this.serviceContenidoService.getData().subscribe({
      next: (data) => {
        this.data_usuario = data;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });
  }

  onSubmit(form: any): void {
    if (!form.name || !form.password) {
      alert('Por favor, ingrese un nombre de usuario y contraseña.');
      return;
    }

    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(form.name)) {
      alert('Verifique que su usuario esté correctamente escrito. Intentelo de nuevo');
      return;
    }

    const encontrado = this.data_usuario.some(item =>
      form.name === item.username && form.password === item.password
    );

    if (encontrado) {
      const user = this.data_usuario.find(item =>
        form.name === item.username && form.password === item.password
      );

      if (user) {
        const data = { id: user.id, username: user.username };
        this.storageService.setItem('dataKey', data);

        window.location.href = '/main';
      }
    } else {
      alert('Usuario y/o contraseña incorrectos. Inténtelo de nuevo');
    }
  }
}
