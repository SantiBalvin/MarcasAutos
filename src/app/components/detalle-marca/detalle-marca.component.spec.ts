import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMarcaComponent } from './detalle-marca.component';
import { MarcaCarroService } from '../../service/marca-carro.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

class MarcaCarroServiceMock {
  getMarcas() {
    return [
      { id: '1', nombre: 'Toyota', pais: 'Japan', anio: 1937, imagen: 'toyota.jpg' },
      { id: '2', nombre: 'Ford', pais: 'USA', anio: 1903, imagen: 'ford.jpg' }
    ];
  }
}

describe('DetalleMarcaComponent', () => {
  let component: DetalleMarcaComponent;
  let fixture: ComponentFixture<DetalleMarcaComponent>;
  let mockMarcaService: MarcaCarroServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, DetalleMarcaComponent],
      providers: [
        { provide: MarcaCarroService, useClass: MarcaCarroServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => key === 'id' ? '999' : null } } // Configurar el mock aquí
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMarcaComponent);
    component = fixture.componentInstance;
    mockMarcaService = TestBed.inject(MarcaCarroService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get marca details on init', () => {
    component.ngOnInit();
    expect(component.marca).toBeDefined();
    expect(component.marca?.id).toBe('1');
    expect(component.marca?.nombre).toBe('Toyota');
    expect(component.marca?.pais).toBe('Japan');
    expect(component.marca?.anio).toBe(1937);
  });

  it('should show "The brand was not found." if marca is not found', () => {
    fixture.detectChanges();

    component.ngOnInit();
    fixture.detectChanges();

    const notFoundText = fixture.nativeElement.querySelector('p').textContent;
    expect(notFoundText).toBe('The brand was not found.');
  });
});
