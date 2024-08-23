import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DetalleFavoritoComponent } from './detalle-favorito.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { StorageService } from '../servicios/info.service';
import { ApiDataService } from '../api-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('DetalleFavoritoComponent', () => {
  let component: DetalleFavoritoComponent;
  let fixture: ComponentFixture<DetalleFavoritoComponent>;
  let storageService: StorageService;
  let apiDataService: ApiDataService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        DetalleFavoritoComponent, // Importar el componente autónomo
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NavbarComponent // Importar el componente autónomo
      ],
      providers: [
        StorageService,
        ApiDataService
      ]
    }).compileComponents();

    storageService = TestBed.inject(StorageService);
    apiDataService = TestBed.inject(ApiDataService);
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleFavoritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have borrarFavorito function', () => {
    expect(component.borrarFavorito).toBeTruthy();
  });

  it('should have borrarTablaFavorito function', () => {
    expect(component.borrarTablaFavorito).toBeTruthy();
  });

});
