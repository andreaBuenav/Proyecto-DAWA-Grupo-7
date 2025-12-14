import { Injectable } from '@angular/core';
import { Visitante } from './models/programData'; 

/**
 * Servicio para gestionar los visitantes programados del sistema.
 * Permite operaciones CRUD sobre visitantes y sus períodos de validez.
 */
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

  /**
   * Agrega un nuevo visitante al sistema.
   * Genera automáticamente un ID único para el visitante.
   * @param visitante - Datos del visitante sin el ID
   */
  addVisitante(visitante: Omit<Visitante, 'id'>) {
    const nuevoVisitante: Visitante = {
      ...visitante,
      id: this.nextId++,
    };
    this.visitantes.push(nuevoVisitante);
  }

  /**
   * Obtiene la lista completa de visitantes registrados.
   * @returns Array de visitantes
   */
  getVisitantes(): Visitante[] {
    return this.visitantes;
  }

  /**
   * Busca un visitante por su ID.
   * @param id - ID del visitante a buscar
   * @returns El visitante encontrado o undefined si no existe
   */
  getVisitanteById(id: number): Visitante | undefined {
    return this.visitantes.find((v) => v.id === id);
  }

  /**
   * Actualiza los datos de un visitante existente.
   * @param visitanteActualizado - Visitante con los datos actualizados
   */
  updateVisitante(visitanteActualizado: Visitante) {
    const index = this.visitantes.findIndex(
      (v) => v.id === visitanteActualizado.id
    );
    if (index !== -1) {
      this.visitantes[index] = visitanteActualizado;
    }
  }

  /**
   * Elimina un visitante del sistema.
   * @param id - ID del visitante a eliminar
   */
  deleteVisitante(id: number) {
    const index = this.visitantes.findIndex((v) => v.id === id);
    if (index !== -1) {
      this.visitantes.splice(index, 1);
    }
  }
}
