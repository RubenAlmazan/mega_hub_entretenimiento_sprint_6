import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguracionComponent } from './configuracion.component';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { NavbarComponent } from '../navbar/navbar.component'; // Importar otros componentes necesarios
import { StorageService } from '../servicios/info.service';
import { ApiDataService } from '../api-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar HttpClientTestingModule para pruebas
import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

describe('ConfiguracionComponent', () => {
  let component: ConfiguracionComponent;
  let fixture: ComponentFixture<ConfiguracionComponent>;
  let storageService: jasmine.SpyObj<StorageService>;
  let dataService: jasmine.SpyObj<ApiDataService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfiguracionComponent, // Importar el componente independiente
        CommonModule,
        NavbarComponent,
        HttpClientTestingModule // Importar HttpClientTestingModule
      ],
      providers: [
        StorageService,
        ApiDataService // Proveer ApiDataService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;

    spyOn(component, 'restaurarTablaEliminado');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return item on ngOnInit', () => {
    const data = { id_usuario: 1427 }; // Definir correctamente los datos
    storageService.setItem('dataConfiguracion', JSON.stringify(data)); // Usar los datos correctamente

    component.ngOnInit();
    expect(component.idUsuario).toBe(1427); // Asegurarse que sea el valor correcto
  });

  it('should receive id and call restaurarTablaEliminado', fakeAsync(() => {
    const id = 123;
    spyOn(window, 'alert');

    component.restaurarValores(id);

    expect(window.alert).toHaveBeenCalledWith('Espere a que se reconfigure su vista de contenidos');
    expect(component.restaurarTablaEliminado).not.toHaveBeenCalled();

    tick(3000);

    expect(component.restaurarTablaEliminado).toHaveBeenCalledWith(id);
  }));

});
