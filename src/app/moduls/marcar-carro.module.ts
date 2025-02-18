import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarruselImagenesComponent } from '../Shared/carrusel-imagenes/carrusel-imagenes.component';

@NgModule({
  declarations: [CarruselImagenesComponent],
  imports: [CommonModule],
  exports: [CarruselImagenesComponent]
})
export class MarcaCarroModule { }
