import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleContenidoGeneroComponent } from './detalle-contenido-genero.component';

describe('DetalleContenidoGeneroComponent', () => {
  let component: DetalleContenidoGeneroComponent;
  let fixture: ComponentFixture<DetalleContenidoGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleContenidoGeneroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleContenidoGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
