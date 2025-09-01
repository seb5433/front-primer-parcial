import { Component } from '@angular/core';
import { Producto } from '../models';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css'],
  standalone: false
})
export class ProductosListComponent {
  filtro = '';
  editando: Producto | null = null;

  constructor(private svc: ProductoService) {}

  get productos(): Producto[] {
    return this.svc.listar(this.filtro);
  }

  iniciarNuevo() {
    this.editando = { idProducto: 0, nombre: '' };
  }

  editar(p: Producto) {
    this.editando = { ...p };
  }

  cancelar() {
    this.editando = null;
  }

  guardar() {
    if (!this.editando) return;
    const { idProducto, nombre } = this.editando;
    if (!nombre?.trim()) return;
    this.svc.guardar({ idProducto: idProducto || undefined, nombre: nombre.trim() });
    this.editando = null;
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar producto?')) {
      this.svc.eliminar(id);
    }
  }
}

