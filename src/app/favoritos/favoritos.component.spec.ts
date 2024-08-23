import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { FavoritosComponent } from './favoritos.component';
import { StorageService } from '../servicios/info.service';
import { ApiDataService } from '../api-data.service';
import { Router } from '@angular/router';

describe('FavoritosComponent', () => {
  let component: FavoritosComponent;
  let fixture: ComponentFixture<FavoritosComponent>;
  let storageService: jasmine.SpyObj<StorageService>;
  let dataService: jasmine.SpyObj<ApiDataService>;
  let router: Router;

  beforeEach(async () => {
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getItem', 'setItem']);
    const dataServiceSpy = jasmine.createSpyObj('ApiDataService', ['getFavorito']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FavoritosComponent],
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: ApiDataService, useValue: dataServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    dataService = TestBed.inject(ApiDataService) as jasmine.SpyObj<ApiDataService>;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not set item if dataFavorito is null', () => {
    storageService.getItem.and.returnValue(null);

    component.ngOnInit();

    expect(component.item).toBeNull();
  });

  it('should call dataService.getFavorito if item exists', fakeAsync(() => {
    const dataFavorito = JSON.stringify({ id_usuario: 1 });
    storageService.getItem.and.returnValue(dataFavorito);
    dataService.getFavorito.and.returnValue(of([]));

    component.ngOnInit();
    tick();

    expect(dataService.getFavorito).toHaveBeenCalledWith(1);
    expect(component.lista).toEqual([]);
  }));

  it('should handle error when dataService.getFavorito fails', fakeAsync(() => {
    const dataFavorito = JSON.stringify({ id_usuario: 1 });
    storageService.getItem.and.returnValue(dataFavorito);
    dataService.getFavorito.and.returnValue(throwError('error'));

    component.ngOnInit();
    tick();

    expect(dataService.getFavorito).toHaveBeenCalledWith(1);
    expect(component.lista).toBeUndefined();
  }));

  it('should set storage and navigate on ObtenerDetalleFavorito', () => {
    const dataFavorito = JSON.stringify({ id_usuario: 1 });
    storageService.getItem.and.returnValue(dataFavorito);
    dataService.getFavorito.and.returnValue(of([])); // Asegurarse de que el método devuelva un observable
    component.ngOnInit();

    const navigateSpy = spyOn(router, 'navigate');
    component.ObtenerDetalleFavorito(10);

    expect(storageService.setItem).toHaveBeenCalledWith('dataDetalleFavorito', JSON.stringify({ id_usuario: 1, id_contenido: 10 }));
    expect(navigateSpy).toHaveBeenCalledWith(['/detalle_favorito']);
  });

  it('should log error if item is null in ObtenerDetalleFavorito', () => {
    spyOn(console, 'error');

    component.ObtenerDetalleFavorito(10);

    expect(console.error).toHaveBeenCalledWith('item no está definido correctamente');
  });
});
