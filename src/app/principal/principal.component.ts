import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { CommonModule } from '@angular/common';
// import { InfoService } from '../servicios/info.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{
  data: any; // Considera especificar un tipo en lugar de `any`
  valor: any; // Considera especificar un tipo en lugar de `any`

  constructor(
    private dataService: ApiDataService,
    //private infoService: InfoService // Consistencia en la inyección del servicio
  ) { }

  ngOnInit(): void {
    // Suscribirse a los datos de contenido
    /*this.dataService.getDataContenido().subscribe({
      next: (data) => {
        this.data = data;
        //console.log('Datos de contenido:', this.data);
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });*/

    // Suscribirse al EventEmitter
   /* this.infoService.disparador.subscribe((data) => {
      console.log('ID recibido:', data.id);
      this.valor = data.id; // Guardar el valor recibido
      console.log('Valor guardado:', this.valor);
    });*/
  }
}
