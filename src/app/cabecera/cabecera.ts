import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutorizacionService } from '../autorizacion-service';

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
    logueadoCabecera = false;
    nombreUsuario = '';

    constructor(private rutasPaginas:Router, private autoriza:AutorizacionService) {}
  
  ngOnInit(): void {
    this.autoriza.logeado$.subscribe(data => {
      this.logueadoCabecera = data;
      console.log(this.logueadoCabecera);
      this.autoriza.usuarioLogeado$.subscribe(nombre => this.nombreUsuario = nombre);
    })
  }

  /**
   * Navega a la página de inicio de sesión.
   */
  mostrarLogin(){
    this.rutasPaginas.navigate(['/login']);
  }

  /**
   * Cierra la sesión del usuario actual y redirige al inicio.
   */
  cerrarSesion(){
    this.autoriza.logeado$.next(false);
    this.rutasPaginas.navigate(['']);
  }
}
