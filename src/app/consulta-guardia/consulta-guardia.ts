import { Component, OnInit } from '@angular/core';
import { GuardiasService } from '../guardia-autorizacion';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // <-- Importante
import { CommonModule } from '@angular/common';
import { GuardiaService } from '../guardia.service';

@Component({
  selector: 'app-consulta-guardia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // <-- Deben estar aquí
  templateUrl: './consulta-guardia.html',
  styleUrl: './consulta-guardia.css',
})
export class ConsultaGuardia implements OnInit {
  form: FormGroup;
  isNew: boolean = true;

  constructor(
    private fb: FormBuilder,
    private guardiasSrv: GuardiasService,
    private api: GuardiaService,
    public dialogRef: MatDialogRef<ConsultaGuardia>
  ) {
    // Definimos el formulario y sus reglas
    this.form = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      usuario: ['', Validators.required],
      contrasena: [''],
      estado: [true]
    });
  }

  ngOnInit(): void {
    this.guardiasSrv.guardiaSeleccionado$.subscribe((data) => {
      if (data) {
        // Si el ID ya existe en la tabla, es una edición
        const tabla = this.guardiasSrv.tablaGuardias$.value || [];
        this.isNew = !tabla.some((g: any) => g.id === data.id);

        this.form.patchValue({
          id: data.id,
          nombre: data.nombre || '',
          cedula: data.cedula || '',
          telefono: data.telefono || '09',
          usuario: data.usuario || '',
          contrasena: data.contrasena || data.contraseña || '',
          estado: data.estado === 'Activo' || data.estado === true
        });
      }
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const val = this.form.value;
    const body = {
      id: val.id,
      nombres: val.nombre,
      cedula: val.cedula,
      telefono: val.telefono,
      estado: val.estado,
      usuario: val.usuario,
      contraseña: val.contrasena,
      rol: 'GUARDIA',
      transaccion: this.isNew ? 'INSERTAR_GUARDIA' : 'MODIFICAR_GUARDIA'
    };

    this.api.updateGuardia(body).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error al guardar:', err)
    });
    alert('Guardia guardado exitosamente.');
  }
}