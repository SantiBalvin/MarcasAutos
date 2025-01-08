import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MarcaCarroService {
  private localStorageKey = 'marcasCarros';

  // Obtener marcas desde localStorage
  getMarcas() {
    const marcas = localStorage.getItem(this.localStorageKey);
    return marcas ? JSON.parse(marcas) : [];
  }

  // Guardar nueva marca
  saveMarca(marca: any) {
    const marcas = this.getMarcas();
    marcas.push(marca);
    localStorage.setItem(this.localStorageKey, JSON.stringify(marcas));
  }

  // Actualizar marca existente
  updateMarca(updatedMarca: any) {
    const marcas = this.getMarcas().map((marca: any) =>
      marca.nombre === updatedMarca.nombre ? updatedMarca : marca
    );
    localStorage.setItem(this.localStorageKey, JSON.stringify(marcas));
  }

  // Eliminar marca
  deleteMarca(nombre: string) {
    const marcas = this.getMarcas().filter((marca: any) => marca.nombre !== nombre);
    localStorage.setItem(this.localStorageKey, JSON.stringify(marcas));
  }
}
