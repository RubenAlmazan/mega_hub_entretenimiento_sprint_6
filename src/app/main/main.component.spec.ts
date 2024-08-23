import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { ApiDataService } from '../api-data.service';
import { StorageService } from '../servicios/info.service';
import { Router } from '@angular/router';
import { DetalleContenidoService } from '../servicios/detalle-contenido.service';
import { of, throwError } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let dataServiceSpy: jasmine.SpyObj<ApiDataService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let detalleSpy: jasmine.SpyObj<DetalleContenidoService>;

  beforeEach(() => {
    const storageServiceMock = jasmine.createSpyObj('StorageService', ['getItem', 'setItem']);
    const dataServiceMock = jasmine.createSpyObj('ApiDataService', ['getDataContenido']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const detalleMock = jasmine.createSpyObj('DetalleContenidoService', ['']);

    TestBed.configureTestingModule({
      imports: [MainComponent, NavbarComponent],
      providers: [
        { provide: StorageService, useValue: storageServiceMock },
        { provide: ApiDataService, useValue: dataServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: DetalleContenidoService, useValue: detalleMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    dataServiceSpy = TestBed.inject(ApiDataService) as jasmine.SpyObj<ApiDataService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    detalleSpy = TestBed.inject(DetalleContenidoService) as jasmine.SpyObj<DetalleContenidoService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDataContenido on ngOnInit if item and item.id are defined', () => {
    const mockItem = { id: 1 };
    storageServiceSpy.getItem.and.returnValue(mockItem);
    const mockData = { data: 'some data' };
    dataServiceSpy.getDataContenido.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(storageServiceSpy.getItem).toHaveBeenCalledWith('dataKey');
    expect(dataServiceSpy.getDataContenido).toHaveBeenCalledWith(mockItem.id);
    expect(component.lista).toEqual(mockData);
  });

  it('should handle error in getDataContenido', () => {
    const mockItem = { id: 1 };
    storageServiceSpy.getItem.and.returnValue(mockItem);
    const mockError = new Error('Test error');
    dataServiceSpy.getDataContenido.and.returnValue(throwError(mockError));

    spyOn(console, 'error');
    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error al obtener datos:', mockError);
  });

  it('should navigate to /detalle and set dataContenido in storage on ObtenerDetalle', () => {
    const mockItem = { id: 1 };
    component.item = mockItem;
    const idContenido = 2;

    component.ObtenerDetalle(idContenido);

    expect(storageServiceSpy.setItem).toHaveBeenCalledWith('dataContenido', JSON.stringify({ id_usuario: mockItem.id, id_contenido: idContenido }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/detalle']);
  });

  it('should navigate to /favoritos and set dataFavorito in storage on ObtenerFavorito', () => {
    const mockItem = { id: 1 };
    component.item = mockItem;

    component.ObtenerFavorito(2);

    expect(storageServiceSpy.setItem).toHaveBeenCalledWith('dataFavorito', JSON.stringify({ id_usuario: mockItem.id }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/favoritos']);
  });

  it('should navigate to /configuracion and set dataConfiguracion in storage on cambiarConfiguracion', () => {
    const mockItem = { id: 1 };
    component.item = mockItem;

    component.cambiarConfiguracion(2);

    expect(storageServiceSpy.setItem).toHaveBeenCalledWith('dataConfiguracion', JSON.stringify({ id_usuario: mockItem.id }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/configuracion']);
  });

  it('should toggle visibility of navbar-juegos element on visible', () => {
    const mockElement = document.createElement('div');
    mockElement.className = 'navbar-juegos';
    document.body.appendChild(mockElement);

    component.visible();
    expect(mockElement.style.display).toBe('');

    component.visible();
    expect(mockElement.style.display).toBe('');
  });
});
