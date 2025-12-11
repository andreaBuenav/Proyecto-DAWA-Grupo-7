import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Visitante } from '../models/visitante.model';
import { VisitantesService } from '../visitantes.service';
import { ConsultaVisitante } from '../consulta-visitante/consulta-visitante';

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.css'],
  standalone: true,
  imports: [CommonModule, ConsultaVisitante],
})
export class VisitantesComponent implements OnInit {
   visitantes: Visitante[] = [];

  // Variables del modal
  mostrarModal = false;
  editandoVisitante: Visitante | null = null;

  constructor(
    private visitantesService: VisitantesService
  ) {}

  ngOnInit(): void {
    this.cargarVisitantes();
  }

  cargarVisitantes(): void {
    this.visitantes = this.visitantesService.getVisitantes();
  }

  // Abrir modal para crear
  abrirModalAgregar() {
    this.editandoVisitante = null;
    this.mostrarModal = true;
  }

  // Abrir modal para editar
  onEditar(id: number): void {
    const visitante = this.visitantesService.getVisitanteById(id);
    if (visitante) {
      this.editandoVisitante = visitante;
      this.mostrarModal = true;
    }
  }

  // Recibir datos desde el modal
  onGuardarDesdeModal(data: any) {
    if (this.editandoVisitante) {
      // Editar
      this.visitantesService.updateVisitante({
        id: this.editandoVisitante.id,
        ...data,
      });
    } else {
      // Crear
      this.visitantesService.addVisitante(data);
    }

    this.cargarVisitantes();
    this.cerrarModal();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.editandoVisitante = null;
  }

  onEliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      this.visitantesService.deleteVisitante(id);
      this.cargarVisitantes();
    }
  }
}
