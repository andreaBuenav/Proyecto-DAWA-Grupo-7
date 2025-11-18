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
    this.rutasPaginas.navigate(['/guardias']);
  }

 mostrarResidentes(){
    this.rutasPaginas.navigate(['/residentes']);
  }

  mostrarAudit(){
    this.rutasPaginas.navigate(['/audit']);
  }
  mostrarVisitantes(){
    this.rutasPaginas.navigate(['/visitantes']);
  }
  mostrarLpr(){
    this.rutasPaginas.navigate(['/lpr']);
  }
}
