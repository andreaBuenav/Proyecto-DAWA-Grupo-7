import { Injectable } from '@angular/core';
import { Visitante } from './models/visitante.model'; 

@Injectable({
  providedIn: 'root',
})
export class VisitantesService {
  private visitantes: Visitante[] = [
    {
      id: 1,
      nombreCompleto: 'Juan Perez',
      identificacion: '123456789',
      placaVehiculo: 'ABC-123',
      fechaInicio: new Date('2025-11-20T08:00:00'),
      fechaFin: new Date('2025-11-20T17:00:00'),
    },
  ];

  private nextId = 2;

  constructor() { }

  addVisitante(visitante: Omit<Visitante, 'id'>) {
    const nuevoVisitante: Visitante = {
      ...visitante,
      id: this.nextId++,
    };
    this.visitantes.push(nuevoVisitante);
  }


  getVisitantes(): Visitante[] {
    return this.visitantes;
  }

  getVisitanteById(id: number): Visitante | undefined {
    return this.visitantes.find((v) => v.id === id);
  }


  updateVisitante(visitanteActualizado: Visitante) {
    const index = this.visitantes.findIndex(
      (v) => v.id === visitanteActualizado.id
    );
    if (index !== -1) {
      this.visitantes[index] = visitanteActualizado;
    }
  }

  deleteVisitante(id: number) {
    const index = this.visitantes.findIndex((v) => v.id === id);
    if (index !== -1) {
      this.visitantes.splice(index, 1);
    }
  }
}
