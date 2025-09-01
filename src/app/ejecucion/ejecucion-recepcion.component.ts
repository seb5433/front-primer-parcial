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
  
  lista: Turno[] = [];
  mapProveedores: Record<number, Proveedor> = {};
  mapProductos: Record<number, Producto> = {};
  mapJaulas: Record<number, Jaula> = {};
  jaulasDisponibles: Jaula[] = [];

  constructor(
    private turnos: TurnoService,
    private proveedores: ProveedorService,
    private productos: ProductoService,
    private jaulas: JaulaService,
  ) {
    this.cargarDatos();
  }

  private cargarDatos() {
    this.lista = this.turnos.listarPorFecha(this.fecha);
    this.mapProveedores = Object.fromEntries(this.proveedores.listar().map(p => [p.idProveedor, p]));
    this.mapProductos = Object.fromEntries(this.productos.listar().map(p => [p.idProducto, p]));
    this.mapJaulas = Object.fromEntries(this.jaulas.listar().map(j => [j.idJaula, j]));
    this.jaulasDisponibles = this.jaulas.disponibles();
  }

  onFechaChange() {
    this.cargarDatos();
  }

  getEstado(t: Turno): string {
    if (t.horaInicioRecepcion && t.horaFinRecepcion) {
      return 'completado';
    } else if (t.horaInicioRecepcion && !t.horaFinRecepcion) {
      return 'en recepción';
    } else {
      return 'pendiente';
    }
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
    this.cargarDatos();
  }

  finalizar(t: Turno) {
    this.turnos.finalizarRecepcion(t.idTurno);
    this.cargarDatos();
  }
}

