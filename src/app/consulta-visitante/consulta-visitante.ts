import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Visitante } from '../models/programData';

@Component({
  selector: 'app-consulta-visitante',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta-visitante.html',
  styleUrl: './consulta-visitante.css',
})
export class ConsultaVisitante {
   @Input() visible = false;
  @Input() editData: Visitante | null = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmitForm = new EventEmitter<any>();

  visitanteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.visitanteForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      identificacion: ['', Validators.required],
      placaVehiculo: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.editData) {
      this.visitanteForm.patchValue({
        ...this.editData,
        fechaInicio: this.formatDateForInput(this.editData.fechaInicio),
        fechaFin: this.formatDateForInput(this.editData.fechaFin),
      });
    } else {
      this.visitanteForm.reset();
    }
  }

  cerrar() {
    this.onClose.emit();
  }

  guardar() {
    if (this.visitanteForm.valid) {
      this.onSubmitForm.emit(this.visitanteForm.value);
    }
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  }
}
