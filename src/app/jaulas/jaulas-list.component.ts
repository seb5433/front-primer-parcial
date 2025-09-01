import { Component } from '@angular/core';
import { Jaula } from '../models';
import { JaulaService } from '../services/jaula.service';

@Component({
  selector: 'app-jaulas',
  templateUrl: './jaulas-list.component.html',
  styleUrls: ['./jaulas-list.component.css'],
  standalone: false
})
export class JaulasListComponent {
  private _filtro = '';
  editando: Jaula | null = null;
  jaulas: Jaula[] = [];

  constructor(private svc: JaulaService) {
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
    this.jaulas = this.svc.listar(this._filtro);
  }

  iniciarNuevo() {
    this.editando = { idJaula: 0, nombre: '', enUso: 'N' };
  }

  editar(j: Jaula) {
    this.editando = { ...j };
  }

  cancelar() {
    this.editando = null;
  }

  guardar() {
    if (!this.editando) return;
    const { idJaula, nombre, enUso } = this.editando;
    if (!nombre?.trim()) return;
    this.svc.guardar({ idJaula: idJaula || undefined, nombre: nombre.trim(), enUso });
    this.editando = null;
    this.actualizarLista();
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar jaula?')) {
      this.svc.eliminar(id);
      this.actualizarLista();
    }
  }
}

