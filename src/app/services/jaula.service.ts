import { Injectable } from '@angular/core';
import { Jaula, SN } from '../models';

const LS_KEY = 'jaulas';

@Injectable({ providedIn: 'root' })
export class JaulaService {
  private read(): Jaula[] {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Jaula[]) : [];
  }

  private write(items: Jaula[]): void {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }

  private nextId(items: Jaula[]): number {
    return items.length ? Math.max(...items.map(i => i.idJaula)) + 1 : 1;
  }

  listar(filtroNombre?: string): Jaula[] {
    const items = this.read();
    if (!filtroNombre) return items;
    const f = filtroNombre.toLowerCase().trim();
    return items.filter(p => p.nombre.toLowerCase().includes(f));
  }

  disponibles(): Jaula[] {
    return this.read().filter(j => j.enUso === 'N');
  }

  obtener(id: number): Jaula | undefined {
    return this.read().find(p => p.idJaula === id);
  }

  setEnUso(id: number, enUso: SN): void {
    const items = this.read();
    const idx = items.findIndex(j => j.idJaula === id);
    if (idx >= 0) {
      items[idx].enUso = enUso;
      this.write(items);
    }
  }

  guardar(data: Omit<Jaula, 'idJaula'> & Partial<Pick<Jaula, 'idJaula'>>): Jaula {
    const items = this.read();
    if (data.idJaula) {
      const idx = items.findIndex(i => i.idJaula === data.idJaula);
      if (idx >= 0) {
        items[idx] = { idJaula: data.idJaula, nombre: data.nombre, enUso: data.enUso ?? 'N' };
        this.write(items);
        return items[idx];
      }
    }
    const nuevo: Jaula = {
      idJaula: this.nextId(items),
      nombre: data.nombre,
      enUso: data.enUso ?? 'N',
    };
    items.push(nuevo);
    this.write(items);
    return nuevo;
  }

  eliminar(id: number): void {
    const items = this.read().filter(i => i.idJaula !== id);
    this.write(items);
  }
}

