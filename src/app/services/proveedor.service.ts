import { Injectable } from '@angular/core';
import { Proveedor } from '../models';

const LS_KEY = 'proveedores';

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  private read(): Proveedor[] {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Proveedor[]) : [];
  }

  private write(items: Proveedor[]): void {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }

  private nextId(items: Proveedor[]): number {
    return items.length ? Math.max(...items.map(i => i.idProveedor)) + 1 : 1;
  }

  listar(filtroNombre?: string): Proveedor[] {
    const items = this.read();
    if (!filtroNombre) return items;
    const f = filtroNombre.toLowerCase().trim();
    return items.filter(p => p.nombre.toLowerCase().includes(f));
  }

  obtener(id: number): Proveedor | undefined {
    return this.read().find(p => p.idProveedor === id);
  }

  guardar(data: Omit<Proveedor, 'idProveedor'> & Partial<Pick<Proveedor, 'idProveedor'>>): Proveedor {
    const items = this.read();
    if (data.idProveedor) {
      const idx = items.findIndex(i => i.idProveedor === data.idProveedor);
      if (idx >= 0) {
        items[idx] = { idProveedor: data.idProveedor, nombre: data.nombre };
        this.write(items);
        return items[idx];
      }
    }
    const nuevo: Proveedor = {
      idProveedor: this.nextId(items),
      nombre: data.nombre,
    };
    items.push(nuevo);
    this.write(items);
    return nuevo;
  }

  eliminar(id: number): void {
    const items = this.read().filter(i => i.idProveedor !== id);
    this.write(items);
  }
}

