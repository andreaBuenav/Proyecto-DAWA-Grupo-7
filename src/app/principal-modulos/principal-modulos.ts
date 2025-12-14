import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizacionService } from '../autorizacion-service';
import { CommonModule } from '@angular/common';

/**
 * Componente del menú principal de módulos del sistema.
 * Muestra los botones de navegación a cada módulo según permisos del usuario.
 */
@Component({
  selector: 'app-principal-modulos',
  imports: [CommonModule],
  templateUrl: './principal-modulos.html',
  styleUrls: ['./principal-modulos.css'],
})
export class PrincipalModulos {
   constructor(
     private rutasPaginas: Router,
     private autoriza: AutorizacionService
   ) {}

   /**
    * Verifica si el usuario tiene permiso para acceder al módulo de guardias.
    * @returns true si tiene permiso, false en caso contrario
    */
   puedeVerGuardias(): boolean {
     return this.autoriza.tienePermiso('guardias');
   }

   /**
    * Verifica si el usuario tiene permiso para acceder al módulo de residentes.
    * @returns true si tiene permiso, false en caso contrario
    */
   puedeVerResidentes(): boolean {
     return this.autoriza.tienePermiso('residentes');
   }

   /**
    * Verifica si el usuario tiene permiso para acceder al módulo de auditoría.
    * @returns true si tiene permiso, false en caso contrario
    */
   puedeVerAudit(): boolean {
     return this.autoriza.tienePermiso('audit');
   }

   /**
    * Verifica si el usuario tiene permiso para acceder al módulo de visitantes.
    * @returns true si tiene permiso, false en caso contrario
    */
   puedeVerVisitantes(): boolean {
     return this.autoriza.tienePermiso('visitantes');
   }

   /**
    * Verifica si el usuario tiene permiso para acceder al módulo LPR.
    * @returns true si tiene permiso, false en caso contrario
    */
   puedeVerLpr(): boolean {
     return this.autoriza.tienePermiso('lpr');
   }

   /**
    * Verifica si el usuario tiene permiso para acceder al panel de control.
    * @returns true si tiene permiso, false en caso contrario
    */
   puedeVerPanelControl(): boolean {
     return this.autoriza.tienePermiso('panel-control');
   }

 /**
  * Navega al módulo de gestión de guardias.
  */
 mostrarGuardias(){
    this.rutasPaginas.navigate(['/app/guardias']);
  }

 /**
  * Navega al módulo de gestión de residentes.
  */
 mostrarResidentes(){
    this.rutasPaginas.navigate(['/app/residentes']);
  }

  /**
   * Navega al módulo de auditoría.
   */
  mostrarAudit(){
    this.rutasPaginas.navigate(['/app/audit']);
  }
  
  /**
   * Navega al módulo de visitantes programados.
   */
  mostrarVisitantes(){  
    this.rutasPaginas.navigate(['/app/visitantes']);
  }
  
  /**
   * Navega al módulo de reconocimiento de placas (LPR).
   */
  mostrarLpr(){
    this.rutasPaginas.navigate(['/app/lpr']);
  }
  
  /**
   * Navega al panel de control de accesos.
   */
  mostrarPanelControl(){
    this.rutasPaginas.navigate(['/app/panel-control']);
  }
}
