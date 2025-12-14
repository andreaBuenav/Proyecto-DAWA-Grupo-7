import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizacionService } from '../autorizacion-service';
import { CommonModule } from '@angular/common';

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

   // Métodos para verificar permisos
   puedeVerGuardias(): boolean {
     return this.autoriza.tienePermiso('guardias');
   }

   puedeVerResidentes(): boolean {
     return this.autoriza.tienePermiso('residentes');
   }

   puedeVerAudit(): boolean {
     return this.autoriza.tienePermiso('audit');
   }

   puedeVerVisitantes(): boolean {
     return this.autoriza.tienePermiso('visitantes');
   }

   puedeVerLpr(): boolean {
     return this.autoriza.tienePermiso('lpr');
   }

   puedeVerPanelControl(): boolean {
     return this.autoriza.tienePermiso('panel-control');
   }

 mostrarGuardias(){
    this.rutasPaginas.navigate(['/app/guardias']);
  }

 mostrarResidentes(){
    this.rutasPaginas.navigate(['/app/residentes']);
  }

  mostrarAudit(){
    this.rutasPaginas.navigate(['/app/audit']);
  }
  mostrarVisitantes(){  
    this.rutasPaginas.navigate(['/app/visitantes']);
  }
  mostrarLpr(){
    this.rutasPaginas.navigate(['/app/lpr']);
  }
  mostrarPanelControl(){
    this.rutasPaginas.navigate(['/app/panel-control']);
  }
}
