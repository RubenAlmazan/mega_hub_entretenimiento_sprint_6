import { Component, OnInit } from '@angular/core';
import { ServiceContenidoService } from '../service-contenido.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pantalla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pantalla.component.html',
  styleUrls: ['./pantalla.component.css']
})
export class PantallaComponent implements OnInit {
  data: any; // Property to hold the data

  constructor(private serviceContenidoService: ServiceContenidoService) { }

  ngOnInit(): void {
    this.fetchData();
  }
  
  fetchData(): void {
    this.serviceContenidoService.getData().subscribe(
      (response) => {
        this.data = response;
        console.log('Data received:', this.data);
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
}
