import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { StorageService } from '../servicios/info.service';
import { ApiDataService } from '../api-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar HttpClientTestingModule para pruebas
import { RouterTestingModule } from '@angular/router/testing'; 

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent, // Importar el componente independiente
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

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
