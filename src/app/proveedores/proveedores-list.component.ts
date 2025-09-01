import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Proveedor } from '../models';
import { ProveedorService } from '../services/proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores-list.component.html',
  styleUrls: ['./proveedores-list.component.css'],
  standalone: false,
})
export class ProveedoresListComponent {
  filtro = '';
  editando: Proveedor | null = null;
  nuevoNombre = '';

  constructor(private svc: ProveedorService) {}

  get proveedores(): Proveedor[] {
    return this.svc.listar(this.filtro);
  }

  iniciarNuevo() {
    this.editando = { idProveedor: 0, nombre: '' };
  }

  editar(p: Proveedor) {
    this.editando = { ...p };
  }

  cancelar() {
    this.editando = null;
  }

  guardar() {
    if (!this.editando) return;
    const { idProveedor, nombre } = this.editando;
    if (!nombre?.trim()) return;
    this.svc.guardar({ idProveedor: idProveedor || undefined, nombre: nombre.trim() });
    this.editando = null;
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar proveedor?')) {
      this.svc.eliminar(id);
    }
  }
}

