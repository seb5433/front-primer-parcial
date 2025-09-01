// Modelos de dominio
export interface Proveedor {
  idProveedor: number;
  nombre: string;
}

export interface Producto {
  idProducto: number;
  nombre: string;
}

export type SN = 'S' | 'N';

export interface Jaula {
  idJaula: number;
  nombre: string;
  enUso: SN; // 'S' o 'N'
}

export interface TurnoDetalle {
  idTurno: number;
  idProducto: number;
  cantidad: number;
}

export interface TurnoCabecera {
  idTurno: number;
  fecha: string; // formato yyyy-MM-dd
  horaInicioAgendamiento: string; // HH:mm
  horaFinAgendamiento: string;   // HH:mm
  idProveedor: number;
  idJaula?: number | null; // se asigna al iniciar recepción
  horaInicioRecepcion?: string | null; // HH:mm (hora actual al iniciar)
  horaFinRecepcion?: string | null;    // HH:mm (hora actual al finalizar)
}

export interface Turno extends TurnoCabecera {
  detalles: TurnoDetalle[];
}

export const HORAS_MEDIA_HORA: string[] = (() => {
  const horas: string[] = [];
  const start = 7 * 60;   // 07:00
  const end = 18 * 60;    // 18:00
  for (let m = start; m <= end; m += 30) {
    const h = Math.floor(m / 60).toString().padStart(2, '0');
    const mm = (m % 60).toString().padStart(2, '0');
    horas.push(`${h}:${mm}`);
  }
  return horas;
})();

export function ahoraHHmm(): string {
  const d = new Date();
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

