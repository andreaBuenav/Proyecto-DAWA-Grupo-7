import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-principal-modulos',
  imports: [],
  templateUrl: './principal-modulos.html',
  styleUrls: ['./principal-modulos.css'],
})
export class PrincipalModulos {
   constructor(private rutasPaginas:Router){}

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
