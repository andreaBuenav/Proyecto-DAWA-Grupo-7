import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutorizacionService, UsuarioSesion } from '../autorizacion-service';

/**
 * Componente de la cabecera principal del sistema.
 * Muestra información del usuario logueado y opciones de sesión.
 */
@Component({
  selector: 'app-cabecera',
  imports: [CommonModule],
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css'],
})
export class Cabecera {
    logueadoCabecera: boolean = false;
  nombreUsuario: string = '';
  rolUsuario: string = '';

  constructor(
    private router: Router,
    private authService: AutorizacionService
  ) {}

  ngOnInit(): void {

    // Escucha si está logueado
    this.authService.logeado$.subscribe(logueado => {
      this.logueadoCabecera = logueado;
    });

    // Escucha datos del usuario
    this.authService.usuario$.subscribe((usuario: UsuarioSesion | null) => {
      if (usuario) {
        this.nombreUsuario =
          usuario.nombre_guardia ||
          usuario.nombre_residente ||
          usuario.usuario;

        this.rolUsuario = usuario.rol;
      } else {
        this.nombreUsuario = '';
        this.rolUsuario = '';
      }
    });
  }

  // =============================
  // IR AL LOGIN
  // =============================
  mostrarLogin() {
    this.router.navigate(['/login']);
  }

  // =============================
  // CERRAR SESIÓN
  // =============================
  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
