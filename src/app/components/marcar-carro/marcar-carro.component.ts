import { Component } from '@angular/core';
import { MarcaCarroService } from '../../service/marca-carro.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marcar-carro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marcar-carro.component.html',
  styleUrls: ['./marcar-carro.component.css'],
})
export class MarcarCarroComponent {
  marcas = this.marcaService.getMarcas();
  nombre: string = '';
  pais: string = '';
  anio: string = '';
  editing: boolean = false;
  editingMarca: any = null;

  constructor(private marcaService: MarcaCarroService) {}

  // Agregar una nueva marca
  addMarca() {
    if (this.nombre && this.pais) {
      const nuevaMarca = { nombre: this.nombre, pais: this.pais, anio: this.anio || 'Desconocido' };
      this.marcaService.saveMarca(nuevaMarca);
      this.marcas = this.marcaService.getMarcas();
      this.resetForm();
    }
  }

  // Editar una marca existente
  editMarca(marca: any) {
    this.editing = true;
    this.editingMarca = { ...marca };
    this.nombre = marca.nombre;
    this.pais = marca.pais;
    this.anio = marca.anio;
  }

  // Actualizar una marca
  updateMarca() {
    if (this.nombre && this.pais) {
      const updatedMarca = { ...this.editingMarca, nombre: this.nombre, pais: this.pais, anio: this.anio || 'Desconocido' };
      this.marcaService.updateMarca(updatedMarca);
      this.marcas = this.marcaService.getMarcas();
      this.resetForm();
    }
  }

  // Eliminar una marca
  deleteMarca(marca: any) {
    if (confirm('¿Estás seguro de eliminar esta marca?')) {
      this.marcaService.deleteMarca(marca.nombre);
      this.marcas = this.marcaService.getMarcas();
    }
  }

  // Resetear formulario
  resetForm() {
    this.nombre = '';
    this.pais = '';
    this.anio = '';
    this.editing = false;
    this.editingMarca = null;
  }
}
