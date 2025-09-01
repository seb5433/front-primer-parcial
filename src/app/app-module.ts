import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProveedoresListComponent } from './proveedores/proveedores-list.component';
import { ProductosListComponent } from './productos/productos-list.component';
import { JaulasListComponent } from './jaulas/jaulas-list.component';
import { ReservaTurnoComponent } from './turnos/reserva-turno.component';
import { EjecucionRecepcionComponent } from './ejecucion/ejecucion-recepcion.component';

@NgModule({
  declarations: [
    App,
    ProveedoresListComponent,
    ProductosListComponent,
    JaulasListComponent,
    ReservaTurnoComponent,
    EjecucionRecepcionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
