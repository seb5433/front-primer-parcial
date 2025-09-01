import { Injectable } from '@angular/core';
import { Producto } from '../models';

const LS_KEY = 'productos';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private read(): Producto[] {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Producto[]) : [];
  }

  private write(items: Producto[]): void {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }

  private nextId(items: Producto[]): number {
    return items.length ? Math.max(...items.map(i => i.idProducto)) + 1 : 1;
  }

  listar(filtroNombre?: string): Producto[] {
    const items = this.read();
    if (!filtroNombre) return items;
    const f = filtroNombre.toLowerCase().trim();
    return items.filter(p => p.nombre.toLowerCase().includes(f));
  }

  obtener(id: number): Producto | undefined {
    return this.read().find(p => p.idProducto === id);
  }

  guardar(data: Omit<Producto, 'idProducto'> & Partial<Pick<Producto, 'idProducto'>>): Producto {
    const items = this.read();
    if (data.idProducto) {
      const idx = items.findIndex(i => i.idProducto === data.idProducto);
      if (idx >= 0) {
        items[idx] = { idProducto: data.idProducto, nombre: data.nombre };
        this.write(items);
        return items[idx];
      }
    }
    const nuevo: Producto = {
      idProducto: this.nextId(items),
      nombre: data.nombre,
    };
    items.push(nuevo);
    this.write(items);
    return nuevo;
  }

  eliminar(id: number): void {
    const items = this.read().filter(i => i.idProducto !== id);
    this.write(items);
  }
}

