import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalComponent } from './principal.component';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { NavbarComponent } from '../navbar/navbar.component'; // Importar otros componentes necesarios
import { StorageService } from '../servicios/info.service';
import { ApiDataService } from '../api-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar HttpClientTestingModule para pruebas
import { RouterTestingModule } from '@angular/router/testing'; 

describe('PrincipalComponent', () => {
  let component: PrincipalComponent;
  let fixture: ComponentFixture<PrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PrincipalComponent, // Importar el componente independiente
        CommonModule,
        NavbarComponent,
        HttpClientTestingModule, // Importar HttpClientTestingModule
        RouterTestingModule // Importar RouterTestingModule para pruebas con rutas
      ],
      providers: [
        StorageService,
        ApiDataService // Proveer ApiDataService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
