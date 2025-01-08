import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcarCarroComponent } from './components/marcar-carro/marcar-carro.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MarcarCarroComponent],  // Importar componentes standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-marcas-carros';
}
