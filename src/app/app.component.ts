import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcarCarroRoutingModule } from './moduls/marcar-carro-routing.module';
import { MarcaCarroModule } from './moduls/marcar-carro.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MarcarCarroRoutingModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-marcas-carros';
}
