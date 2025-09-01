import { Injectable } from '@angular/core';
import { Turno, TurnoDetalle, TurnoCabecera, ahoraHHmm } from '../models';
import { JaulaService } from './jaula.service';

const LS_KEY = 'turnos';

@Injectable({ providedIn: 'root' })
export class TurnoService {
  constructor(private jaulas: JaulaService) {}

  private read(): Turno[] {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Turno[]) : [];
  }

  private write(items: Turno[]): void {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }

  private nextId(items: Turno[]): number {
    return items.length ? Math.max(...items.map(i => i.idTurno)) + 1 : 1;
  }

  listarPorFecha(fecha: string): Turno[] {
    return this.read()
      .filter(t => t.fecha === fecha)
      .sort((a, b) => a.horaInicioAgendamiento.localeCompare(b.horaInicioAgendamiento));
  }

  listarTodos(): Turno[] {
    return this.read();
  }

  obtener(id: number): Turno | undefined {
    return this.read().find(t => t.idTurno === id);
  }

  registrarReserva(cab: Omit<TurnoCabecera, 'idTurno' | 'idJaula' | 'horaInicioRecepcion' | 'horaFinRecepcion'>, detalles: Omit<TurnoDetalle, 'idTurno'>[]): Turno {
    const items = this.read();
    const idTurno = this.nextId(items);
    const turno: Turno = {
      ...cab,
      idTurno,
      idJaula: null,
      horaInicioRecepcion: null,
      horaFinRecepcion: null,
      detalles: detalles.map(d => ({ ...d, idTurno })),
    };
    items.push(turno);
    this.write(items);
    return turno;
  }

  eliminar(id: number): void {
    const items = this.read().filter(t => t.idTurno !== id);
    this.write(items);
  }

  iniciarRecepcion(idTurno: number, idJaula: number): void {
    const items = this.read();
    const idx = items.findIndex(t => t.idTurno === idTurno);
    if (idx < 0) return;
    const t = items[idx];
    t.idJaula = idJaula;
    t.horaInicioRecepcion = ahoraHHmm();
    this.jaulas.setEnUso(idJaula, 'S');
    items[idx] = t;
    this.write(items);
  }

  finalizarRecepcion(idTurno: number): void {
    const items = this.read();
    const idx = items.findIndex(t => t.idTurno === idTurno);
    if (idx < 0) return;
    const t = items[idx];
    t.horaFinRecepcion = ahoraHHmm();
    if (t.idJaula != null) {
      this.jaulas.setEnUso(t.idJaula, 'N');
    }
    items[idx] = t;
    this.write(items);
  }
}

