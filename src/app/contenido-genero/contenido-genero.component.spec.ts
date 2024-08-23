import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoGeneroComponent } from './contenido-genero.component';

describe('ContenidoGeneroComponent', () => {
  let component: ContenidoGeneroComponent;
  let fixture: ComponentFixture<ContenidoGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoGeneroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
