import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcarCarroComponent } from './components/marcar-carro/marcar-carro.component';
import { DetalleMarcaComponent } from './components/detalle-marca/detalle-marca.component';
export const routes: Routes = [
  { path: '', component: MarcarCarroComponent },
  { path: 'brandDetail/:id', component: DetalleMarcaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

