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
  private _filtro = '';
  editando: Producto | null = null;
  productos: Producto[] = [];

  constructor(private svc: ProductoService) {
    this.actualizarLista();
  }

  get filtro(): string {
    return this._filtro;
  }

  set filtro(value: string) {
    this._filtro = value;
    this.actualizarLista();
  }

  private actualizarLista() {
    this.productos = this.svc.listar(this._filtro);
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
    this.actualizarLista();
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar producto?')) {
      this.svc.eliminar(id);
      this.actualizarLista();
    }
  }
}

