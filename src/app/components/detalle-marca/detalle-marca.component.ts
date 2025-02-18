import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarcaCarroService, Marca } from '../../service/marca-carro.service';

@Component({
  selector: 'app-detalle-marca',
  standalone: true,
  templateUrl: './detalle-marca.component.html',
  styleUrls: ['./detalle-marca.component.css'],
  imports: [CommonModule],
})
export class DetalleMarcaComponent implements OnInit {
  marca: Marca | undefined;

  constructor(
    private route: ActivatedRoute,
    private marcaService: MarcaCarroService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.marca = this.marcaService.getMarcas().find((marca) => marca.id === id);
    }
  }
}
