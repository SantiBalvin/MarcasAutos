import { Component, computed, OnInit, signal } from '@angular/core';
import { Marca } from '../../service/marca-carro.service';
import { MarcaCarroService } from '../../service/marca-carro.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaCarroModule } from "../../moduls/marcar-carro.module";

@Component({
  selector: 'app-marcar-carro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MarcaCarroModule],
  templateUrl: './marcar-carro.component.html',
  styleUrls: ['./marcar-carro.component.css'],
})
export class MarcarCarroComponent implements OnInit {
  marcas: Marca[] = [];

  marcasSignal = signal<Marca[]>([]);
  contadorMarcas = computed(() => this.marcasSignal().length);



  mensajesDeError: string[] = [];
  editing: boolean = false;
  editingMarca: Marca | null = null;
  marcaForm: FormGroup;
  selectedImage: string | null = null;

  images: string[] = [];

  constructor(
    private marcaService: MarcaCarroService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.marcaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      pais: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      anio: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1886), Validators.max(new Date().getFullYear())]],
    });
  }

  ngOnInit(): void {
    this.marcas = this.marcaService.getMarcas();
    this.updateImageList();
    this.marcasSignal.set(this.marcaService.getMarcas());
  }

  updateImageList() {
    this.images = this.marcas.filter(marca => marca.imagen).map(marca => marca.imagen!);
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.includes('image')) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.selectedImage = e.target.result;
          this.previewImage(file);
        };

        reader.readAsDataURL(file);
      } else {
        this.selectedImage = null;
        alert('Please select a valid image.');
      }
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const imgElement = document.getElementById('imagePreview') as HTMLImageElement;

      if (imgElement) {
        imgElement.src = e.target.result;
      } else {
        console.error('Elemento "imagePreview" no encontrado.');
      }
    };
    reader.readAsDataURL(file);
  }

  addMarca() {
    if (this.marcaForm.invalid) {
      this.mensajesDeError = this.getFormValidationMessages();
      return;
    }

    const nuevaMarca: Marca = {
      id: crypto.randomUUID(),
      nombre: this.marcaForm.value.nombre,
      pais: this.marcaForm.value.pais,
      anio: parseInt(this.marcaForm.value.anio, 10),
      imagen: this.selectedImage,
    };

    try {
      this.marcaService.saveMarca(nuevaMarca);
      this.marcas = this.marcaService.getMarcas();
      const marcasActualizadas = [...this.marcasSignal(), nuevaMarca];
      this.marcasSignal.set(marcasActualizadas);
      this.updateImageList();
      this.resetForm();
    } catch (err: any) {
      this.mensajesDeError = [err.message];
    }
  }

  editMarca(marca: Marca) {
    console.log('Editando marca:', marca);
    this.editingMarca = marca;
    this.editing = true;
    this.marcaForm.patchValue({
      nombre: marca.nombre,
      pais: marca.pais,
      anio: marca.anio,
    });
  }

  updateMarca() {
    if (this.marcaForm.invalid) {
      this.mensajesDeError = this.getFormValidationMessages();
      console.log('Formulario inválido:', this.marcaForm.errors);
      return;
    }

    if (this.editingMarca) {
      const updatedMarca = {
        ...this.editingMarca,
        nombre: this.marcaForm.value.nombre,
        pais: this.marcaForm.value.pais,
        anio: parseInt(this.marcaForm.value.anio, 10),
        imagen: this.selectedImage,
      };

      console.log('Actualizando marca:', updatedMarca);
      try {
        this.marcaService.updateMarca(updatedMarca);
        this.marcas = this.marcaService.getMarcas();
        this.marcasSignal.set(this.marcasSignal().map(marca => marca.id === updatedMarca.id ? updatedMarca : marca));
        this.updateImageList();
        this.resetForm();
      } catch (err: any) {
        this.mensajesDeError = [err.message];
        console.error('Error al actualizar marca:', err);
      }
    }
  }

  deleteMarca(marca: Marca) {
    if (confirm('Are you sure to remove this flag?')) {
      this.marcaService.deleteMarca(marca.id);
      this.marcas = this.marcaService.getMarcas();
      this.marcasSignal.set(this.marcasSignal().filter(m => m.id !== marca.id));
      this.updateImageList();
    }
  }

  resetForm() {
    this.marcaForm.reset();
    this.editing = false;
    this.editingMarca = null;
    this.selectedImage = null;
    this.mensajesDeError = [];
  }

  getFormValidationMessages() {
    const messages = [];
    const controls = this.marcaForm.controls;
    if (controls['nombre'].errors) {
      if (controls['nombre'].errors['required']) {
        messages.push('The name is required.');
      }
      if (controls['nombre'].errors['minlength']) {
        messages.push('The name must have at least 3 characters.');
      }
      if (controls['nombre'].errors['maxlength']) {
        messages.push('The name must not exceed 50 characters.');
      }
    }
    if (controls['pais'].errors) {
      if (controls['pais'].errors['required']) {
        messages.push('The country is required.');
      }
      if (controls['pais'].errors['minlength']) {
        messages.push('The country must have at least 3 characters.');
      }
      if (controls['pais'].errors['maxlength']) {
        messages.push('The country must not exceed 50 characters.');
      }
    }
    if (controls['anio'].errors) {
      if (controls['anio'].errors['required']) {
        messages.push('The year is required.');
      }
      if (controls['anio'].errors['pattern']) {
        messages.push('The year must be a number.');
      }
      if (controls['anio'].errors['min']) {
        messages.push('The year must be 1886 or later.');
      }
      if (controls['anio'].errors['max']) {
        messages.push(`The year cannot be greater than ${new Date().getFullYear()}.`);
      }
    }
    return messages;
  }

  verDetalles(id: string) {
    this.router.navigate([`/brandDetail/${id}`]);
  }
}
