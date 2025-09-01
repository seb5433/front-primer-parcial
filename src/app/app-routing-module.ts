import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresListComponent } from './proveedores/proveedores-list.component';
import { ProductosListComponent } from './productos/productos-list.component';
import { JaulasListComponent } from './jaulas/jaulas-list.component';
import { ReservaTurnoComponent } from './turnos/reserva-turno.component';
import { EjecucionRecepcionComponent } from './ejecucion/ejecucion-recepcion.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'proveedores' },
  { path: 'proveedores', component: ProveedoresListComponent },
  { path: 'productos', component: ProductosListComponent },
  { path: 'jaulas', component: JaulasListComponent },
  { path: 'reservas/nuevo', component: ReservaTurnoComponent },
  { path: 'ejecucion', component: EjecucionRecepcionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
