import { TestBed } from '@angular/core/testing';

import { ServiceContenidoService } from './service-contenido.service';

describe('ServiceContenidoService', () => {
  let service: ServiceContenidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceContenidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
