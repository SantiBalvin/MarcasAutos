import { Injectable } from '@angular/core';

export interface Marca {
  id: string;
  nombre: string;
  pais: string;
  anio: number;
  imagen: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class MarcaCarroService {
  private localStorageKey = 'marcasCarros';

  getMarcas(): Marca[] {
    const marcas = localStorage.getItem(this.localStorageKey);
    return marcas ? JSON.parse(marcas) : [];
  }

  saveMarca(marca: Omit<Marca, 'id'>) {
    const marcas = this.getMarcas();
    const nuevaMarca: Marca = {
      ...marca,
      id: crypto.randomUUID(),
    };

    if (marcas.some((m) => m.nombre.trim().toLowerCase() === marca.nombre.trim().toLowerCase())) {
      throw new Error('The brand already exists.');
    }

    if (!marca.imagen) {
      throw new Error('You must select an image for the brand.');
    }

    marcas.push(nuevaMarca);
    localStorage.setItem(this.localStorageKey, JSON.stringify(marcas));
  }


  updateMarca(updatedMarca: Marca) {
    const marcas = this.getMarcas().map((marca) =>
      marca.id === updatedMarca.id ? updatedMarca : marca
    );
    localStorage.setItem(this.localStorageKey, JSON.stringify(marcas));
  }

  deleteMarca(id: string) {
    const marcas = this.getMarcas().filter((marca) => marca.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(marcas));
  }
}
