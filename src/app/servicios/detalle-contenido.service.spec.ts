import { TestBed } from '@angular/core/testing';

import { DetalleContenidoService } from './detalle-contenido.service';

describe('DetalleContenidoService', () => {
  let service: DetalleContenidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleContenidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
