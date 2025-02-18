import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarcarCarroComponent } from './marcar-carro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { getLocaleWeekEndRange } from '@angular/common';

describe('MarcaCarroComponent', () => {
  let component: MarcarCarroComponent;
  let fixture: ComponentFixture<MarcarCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,MarcarCarroComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcarCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba de la creación de campos del formulario
  it('debería crear el formulario con los campos nombre, pais y anio', () => {
    const nombreControl = component.marcaForm.get('nombre');
    const paisControl = component.marcaForm.get('pais');
    const anioControl = component.marcaForm.get('anio');

    expect(nombreControl).toBeTruthy();
    expect(paisControl).toBeTruthy();
    expect(anioControl).toBeTruthy();
  });

  // Prueba para verificar los errores en caso de que los campos sean vacíos
  it('debería mostrar error cuando los campos requeridos están vacíos', () => {
    const nombreInput = fixture.debugElement.query(By.css('#nombre')).nativeElement;
    const paisInput = fixture.debugElement.query(By.css('#pais')).nativeElement;
    const anioInput = fixture.debugElement.query(By.css('#anio')).nativeElement;

    // Simula cambios de input
    nombreInput.value = '';
    paisInput.value = '';
    anioInput.value = '';
    nombreInput.dispatchEvent(new Event('input'));
    paisInput.dispatchEvent(new Event('input'));
    anioInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // Verifica si los mensajes de error están presentes
    const errorMessageNombre = fixture.debugElement.query(By.css('#nombre + div')).nativeElement;
    const errorMessagePais = fixture.debugElement.query(By.css('#pais + div')).nativeElement;
    const errorMessageAnio = fixture.debugElement.query(By.css('#anio + div')).nativeElement;

    expect(errorMessageNombre).toBeTruthy();
    expect(errorMessagePais).toBeTruthy();
    expect(errorMessageAnio).toBeTruthy();
  });


  // Prueba para verificar que el formulario se envíe correctamente si es válido
  it('debería hacer submit correctamente cuando el formulario es válido', () => {
    component.marcaForm.setValue({
      nombre: 'Toyota',
      pais: 'Japan',
      anio: 1937
    });

    spyOn(component, 'addMarca');
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    submitButton.click();
    fixture.detectChanges();

    expect(component.addMarca).toHaveBeenCalled();
  });

  function generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Prueba para verificar si los botones "Editar" llaman a la función de edición
  it('debería llamar a editMarca al hacer clic en el botón de Editar', () => {
    const marca = {
      id: '98456407-68a3-44e9-816f-8714fe827d85',
      nombre: 'chavrolet',
      pais: 'colombia',
      anio: 2000,
      imagen: ''
    };
    component.marcas = [marca];

    spyOn(component, 'editMarca');

    fixture.detectChanges();  // Detectamos cambios para asegurar que se re-rendericen los componentes

    // Ahora buscamos el botón "Editar" dentro de la tabla con la clase '.editar-button'
    const editarButton = fixture.debugElement.query(By.css('.editar-button')).nativeElement;

    // Simulamos un clic en el botón
    editarButton.click();

    fixture.detectChanges();  // Detectamos cambios después del clic

    // Verificamos que la función editMarca fue llamada con la marca correcta
    expect(component.editMarca).toHaveBeenCalledWith(marca);
  });



  // Prueba para verificar que las marcas se están mostrando correctamente en la tabla
  it('debería mostrar las marcas en la tabla', () => {
    component.marcas = [
      {
        id: generateRandomId(), nombre: 'Toyota', pais: 'Japan', anio: 1937,
        imagen: null
      },
      {
        id: generateRandomId(), nombre: 'Ford', pais: 'USA', anio: 1903,
        imagen: null
      },
    ];
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toBe(3);
  });
});
