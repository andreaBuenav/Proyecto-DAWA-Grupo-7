import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizacionService } from '../autorizacion-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu {
 logueadoCabecera = false;
    nombreUsuario = '';

    constructor(private rutasPaginas:Router, private autoriza:AutorizacionService) {}


  mostrarPrincipalModulos() {
    this.rutasPaginas.navigate(['/principal']);
  }

  mostrarGuardias() {
    this.rutasPaginas.navigate(['/app/guardias']);
  }

  mostrarResidentes() {
    this.rutasPaginas.navigate(['/app/residentes']);
  }

  mostrarAudit() {
    this.rutasPaginas.navigate(['/app/audit']);
  }

  mostrarVisitantes() {
    this.rutasPaginas.navigate(['/app/visitantes']);
  }

  mostrarLpr() {
    this.rutasPaginas.navigate(['/app/lpr']);
  }

  mostrarPanelControl() {
    this.rutasPaginas.navigate(['/app/panel-control']);
  }



}
