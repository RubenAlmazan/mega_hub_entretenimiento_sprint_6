import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleComponent } from './detalle.component';
import { StorageService } from '../servicios/info.service';
import { ApiDataService } from '../api-data.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

describe('DetalleComponent', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;
  let storageService: jasmine.SpyObj<StorageService>;
  let dataService: jasmine.SpyObj<ApiDataService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getItem']);
    const dataServiceSpy = jasmine.createSpyObj('ApiDataService', ['getDataElemento', 'insertFavorito', 'deleteContenido']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, DetalleComponent, NavbarComponent],
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: ApiDataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    dataService = TestBed.inject(ApiDataService) as jasmine.SpyObj<ApiDataService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have agregarFavorito function', () => {
    expect(component.agregarFavorito).toBeTruthy();
  });

  it('should have insertarTablaFavorito function', () => {
    expect(component.insertarTablaFavorito).toBeTruthy();
  });

  it('should have quitarContenido function', () => {
    expect(component.quitarContenido).toBeTruthy();
  });

  it('should have eliminarTablaContenido function', () => {
    expect(component.eliminarTablaContenido).toBeTruthy();
  });

  it('should call getDataElemento on ngOnInit when idContenido is present', () => {
    const mockData = { id_usuario: 1, id_contenido: 1 };
    storageService.getItem.and.returnValue(JSON.stringify(mockData));
    const mockResponse = [{ data: 'mockData' }];
    dataService.getDataElemento.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(dataService.getDataElemento).toHaveBeenCalledWith(1);
    expect(component.lista).toEqual(mockResponse);
  });

  it('should call insertFavorito when agregarFavorito is called', (done) => {
    const idContenido = 1;
    const idUsuario = 1;
    dataService.insertFavorito.and.returnValue(of({ message: 'Favorito agregado' }));

    component.agregarFavorito(idContenido, idUsuario);

    setTimeout(() => {
      expect(dataService.insertFavorito).toHaveBeenCalledWith(idContenido, idUsuario);
      done();
    }, 3000);
  });

  it('should call deleteContenido when quitarContenido is called', (done) => {
    const idContenido = 1;
    const idUsuario = 1;
    dataService.deleteContenido.and.returnValue(of({ message: 'Contenido eliminado' }));

    component.quitarContenido(idContenido, idUsuario);

    setTimeout(() => {
      expect(dataService.deleteContenido).toHaveBeenCalledWith(idContenido, idUsuario);
      done();
    }, 3000);
  });
});
