import { Component } from '@angular/core';
import { Jaula, Producto, Proveedor, Turno } from '../models';
import { TurnoService } from '../services/turno.service';
import { ProveedorService } from '../services/proveedor.service';
import { ProductoService } from '../services/producto.service';
import { JaulaService } from '../services/jaula.service';

@Component({
  selector: 'app-ejecucion-recepcion',
  templateUrl: './ejecucion-recepcion.component.html',
  styleUrls: ['./ejecucion-recepcion.component.css'],
  standalone: false
})
export class EjecucionRecepcionComponent {
  fecha = new Date().toISOString().slice(0, 10);
  mostrarDetalles: Record<number, boolean> = {};
  jaulaSeleccionada: Record<number, number | null> = {};

  constructor(
    private turnos: TurnoService,
    private proveedores: ProveedorService,
    private productos: ProductoService,
    private jaulas: JaulaService,
  ) {}

  get lista(): Turno[] {
    return this.turnos.listarPorFecha(this.fecha);
  }

  get mapProveedores(): Record<number, Proveedor> {
    return Object.fromEntries(this.proveedores.listar().map(p => [p.idProveedor, p]));
  }

  get mapProductos(): Record<number, Producto> {
    return Object.fromEntries(this.productos.listar().map(p => [p.idProducto, p]));
  }

  get jaulasDisponibles(): Jaula[] {
    return this.jaulas.disponibles();
  }

  alternarDetalles(idTurno: number) {
    this.mostrarDetalles[idTurno] = !this.mostrarDetalles[idTurno];
  }

  iniciar(t: Turno) {
    const idJ = this.jaulaSeleccionada[t.idTurno] ?? null;
    if (!idJ) {
      alert('Seleccione una jaula disponible');
      return;
    }
    this.turnos.iniciarRecepcion(t.idTurno, idJ);
    this.jaulaSeleccionada[t.idTurno] = null;
  }

  finalizar(t: Turno) {
    this.turnos.finalizarRecepcion(t.idTurno);
  }
}

