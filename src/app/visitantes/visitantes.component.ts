import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Visitante } from '../models/programData';
import { VisitantesService } from '../visitantes.service';
import { ConsultaVisitante } from '../consulta-visitante/consulta-visitante';
import { A } from '@angular/cdk/keycodes';

/**
 * Componente para gestionar los visitantes programados.
 * Permite crear, editar y eliminar visitantes mediante un modal.
 */
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

  /**
   * Carga la lista de visitantes desde el servicio.
   */
 cargarVisitantes(): void {
  this.visitantesService.getVisitantes().subscribe({
    next: (data) => this.visitantes = data,
    error: (err) => alert('Error al cargar visitantes: ' + err.message)
  });
}

  /**
   * Abre el modal para crear un nuevo visitante.
   */
  abrirModalAgregar() {
    this.editandoVisitante = null;
    this.mostrarModal = true;
  }

  /**
   * Abre el modal para editar un visitante existente.
   * @param id - ID del visitante a editar
   */
onEditar(id: number): void {
  const visitante = this.visitantes.find(v => v.id === id); // buscar en el array cargado
  if (visitante) {
    this.editandoVisitante = visitante;
    this.mostrarModal = true;
  }
}

  /**
   * Procesa los datos enviados desde el modal.
   * Crea o actualiza el visitante según el contexto.
   * @param data - Datos del visitante del formulario
   */
 onGuardarDesdeModal(data: any) {
  const isEdit = !!this.editandoVisitante;
  this.visitantesService.saveVisitante({ ...data, id: this.editandoVisitante?.id }, isEdit)
    .subscribe({
      next: () => this.cargarVisitantes(),
      error: (err) => console.error(err)
    });
    
}

  /**
   * Cierra el modal y limpia el estado de edición.
   */
  cerrarModal() {
    this.mostrarModal = false;
    this.editandoVisitante = null;
  }

  /**
   * Elimina un visitante tras confirmación del usuario.
   * @param id - ID del visitante a eliminar
   */
  onEliminar(id: number): void {
  if (confirm('¿Estás seguro de eliminar este registro?')) {
    this.visitantesService.deleteVisitante(id).subscribe({
      next: () => this.cargarVisitantes(),
      error: (err) => console.error(err)
    });
  }
}
}
