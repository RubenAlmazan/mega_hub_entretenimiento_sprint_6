import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ApiDataService } from '../api-data.service';
import { StorageService } from '../servicios/info.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockApiDataService: jasmine.SpyObj<ApiDataService>;
  let mockStorageService: jasmine.SpyObj<StorageService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockApiDataService = jasmine.createSpyObj('ApiDataService', ['getData']);
    mockStorageService = jasmine.createSpyObj('StorageService', ['setItem']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // Importa el componente en lugar de declararlo
        CommonModule,
        FormsModule
      ],
      providers: [
        { provide: ApiDataService, useValue: mockApiDataService },
        { provide: StorageService, useValue: mockStorageService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockApiDataService.getData.and.returnValue(of([])); // Simulamos que getData devuelve un observable vacío
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data array on init', () => {
    mockApiDataService.getData.and.returnValue(of([{ username: 'test', password: '1234' }]));
    component.ngOnInit();
    expect(component.data.length).toBeGreaterThan(0);
  });

  it('should navigate to /main if username and password are correct', () => {
    component.data = [{ id: 1, username: 'test', password: '1234' }];
    const form = { name: 'test', password: '1234' };
    component.onSubmit(form);
    expect(mockStorageService.setItem).toHaveBeenCalledWith('dataKey', { id: 1 });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/main']);
  });

  it('should alert if username and password are incorrect', () => {
    spyOn(window, 'alert');
    component.data = [{ id: 1, username: 'test', password: '1234' }];
    const form = { name: 'wrong', password: 'wrong' };
    component.onSubmit(form);
    expect(window.alert).toHaveBeenCalledWith('Usuario y/o contraseña incorrectos. Inténtelo de nuevo');
  });

  it('should alert if username format is incorrect', () => {
    spyOn(window, 'alert');
    const form = { name: 'invalid user!', password: '1234' };
    component.onSubmit(form);
    expect(window.alert).toHaveBeenCalledWith('Verifique que su usuario esté correctamente escrito. Intentelo de nuevo');
  });

  it('should alert if username or password is missing', () => {
    spyOn(window, 'alert');
    const form = { name: '', password: '' };
    component.onSubmit(form);
    expect(window.alert).toHaveBeenCalledWith('Por favor, ingrese un nombre de usuario y contraseña.');
  });
});
