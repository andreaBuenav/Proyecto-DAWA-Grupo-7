
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Visitante } from '../models/visitante.model';
import { VisitantesService } from '../visitantes.service';
import { MenuVertical } from '../menu-vertical/menu-vertical';

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.css'],
  standalone: true, // <-- ¡IMPORTANTE: AÑADE ESTO!
  imports: [
    CommonModule, // <-- ¡IMPORTANTE: AÑADE ESTO!
    ReactiveFormsModule,
    MenuVertical // <-- ¡IMPORTANTE: AÑADE ESTO!
  ],
})
export class VisitantesComponent implements OnInit {
  visitanteForm: FormGroup;
  visitantes: Visitante[] = [];
  editandoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private visitantesService: VisitantesService
  ) {
    // El resto de tu código aquí no cambia...
    this.visitanteForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      identificacion: ['', Validators.required],
      placaVehiculo: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarVisitantes();
  }

  cargarVisitantes(): void {
    this.visitantes = this.visitantesService.getVisitantes();
  }

  onSubmit(): void {
    if (this.visitanteForm.invalid) {
      return;
    }

    if (this.editandoId !== null) {
      const visitanteActualizado: Visitante = {
        id: this.editandoId,
        ...this.visitanteForm.value,
      };
      this.visitantesService.updateVisitante(visitanteActualizado);
    } else {
      this.visitantesService.addVisitante(this.visitanteForm.value);
    }

    this.resetFormulario();
    this.cargarVisitantes();
  }

  onEditar(id: number): void {
    const visitante = this.visitantesService.getVisitanteById(id);
    if (visitante) {
      this.editandoId = id;
      this.visitanteForm.patchValue({
        ...visitante,
        fechaInicio: this.formatDateForInput(visitante.fechaInicio),
        fechaFin: this.formatDateForInput(visitante.fechaFin),
      });
    }
  }

  onEliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      this.visitantesService.deleteVisitante(id);
      this.cargarVisitantes();
    }
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.visitanteForm.reset();
    this.editandoId = null;
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  }
}
