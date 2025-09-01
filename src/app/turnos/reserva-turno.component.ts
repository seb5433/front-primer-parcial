import { Component } from '@angular/core';
import { HORAS_MEDIA_HORA, Producto, Proveedor, TurnoDetalle } from '../models';
import { TurnoService } from '../services/turno.service';
import { ProveedorService } from '../services/proveedor.service';
import { ProductoService } from '../services/producto.service';

interface ProductoSel extends Producto { seleccionado: boolean; cantidad: number; }

@Component({
  selector: 'app-reserva-turno',
  templateUrl: './reserva-turno.component.html',
  styleUrls: ['./reserva-turno.component.css'],
  standalone: false
})
export class ReservaTurnoComponent {
  fecha = new Date().toISOString().slice(0, 10);
  horaInicioAgendamiento = '07:00';
  horaFinAgendamiento = '07:30';
  idProveedor: number | null = null;

  horas = HORAS_MEDIA_HORA;

  productosSel: ProductoSel[] = [];

  constructor(
    private turnos: TurnoService,
    private proveedores: ProveedorService,
    private productos: ProductoService,
  ) {
    this.recargarProductos();
  }

  get listaProveedores(): Proveedor[] {
    return this.proveedores.listar();
  }

  recargarProductos() {
    this.productosSel = this.productos.listar().map(p => ({ ...p, seleccionado: false, cantidad: 0 }));
  }

  alternarSeleccion(p: ProductoSel) {
    p.seleccionado = !p.seleccionado;
    if (!p.seleccionado) p.cantidad = 0;
  }

  guardar() {
    if (!this.idProveedor) {
      alert('Seleccione un proveedor');
      return;
    }
    const seleccionados = this.productosSel.filter(p => p.seleccionado && p.cantidad > 0);
    if (seleccionados.length === 0) {
      alert('Seleccione al menos un producto con cantidad');
      return;
    }
    const detalles: Omit<TurnoDetalle, 'idTurno'>[] = seleccionados.map(p => ({ idProducto: p.idProducto, cantidad: p.cantidad }));
    this.turnos.registrarReserva({
      fecha: this.fecha,
      horaInicioAgendamiento: this.horaInicioAgendamiento,
      horaFinAgendamiento: this.horaFinAgendamiento,
      idProveedor: this.idProveedor,
    }, detalles);
    alert('Reserva registrada');
    // resetear
    this.horaInicioAgendamiento = '07:00';
    this.horaFinAgendamiento = '07:30';
    this.idProveedor = null;
    this.recargarProductos();
  }
}

