import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuVertical } from '../menu-vertical/menu-vertical';

@Component({
  selector: 'app-gestionresidentes',
  imports: [MenuVertical],
  templateUrl: './gestionresidentes.html',
  styleUrl: './gestionresidentes.css',
})
export class Gestionresidentes {
constructor(private rutasPaginas:Router){}


}
