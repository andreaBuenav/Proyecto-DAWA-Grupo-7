import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Visitante } from '../models/programData';
import { AutorizacionService } from '../autorizacion-service';

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

  constructor(private fb: FormBuilder, private authService: AutorizacionService) {
    this.visitanteForm = this.fb.group({
  id_residente: [0], 
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
      id_residente: this.editData.id_residente,
      nombreCompleto: this.editData.nombreCompleto,
      identificacion: this.editData.identificacion,
      placaVehiculo: this.editData.placaVehiculo,
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

    const usuario = this.authService.obtenerUsuario();

    if (usuario?.id_residente) {
      this.visitanteForm.patchValue({
        id_residente: usuario.id_residente
      });
    }
    this.onSubmitForm.emit(this.visitanteForm.value);
    alert('Visitante guardado correctamente.');
    this.cerrar();
  }
}


  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().slice(0, 16); 
  }
}
