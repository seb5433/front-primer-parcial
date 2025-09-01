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
  filtro = '';
  editando: Jaula | null = null;

  constructor(private svc: JaulaService) {}

  get jaulas(): Jaula[] {
    return this.svc.listar(this.filtro);
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
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar jaula?')) {
      this.svc.eliminar(id);
    }
  }
}

