import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Cabecera } from '../cabecera/cabecera';
import { CopyRight } from '../copy-right/copy-right';

@Component({
  selector: 'app-layout-simple',
  imports: [
    RouterOutlet,
    Cabecera,
    CopyRight
  ],
  templateUrl: './layout-simple.html',
  styleUrl: './layout-simple.css',
})
export class LayoutSimple {
  constructor(private router: Router) {}
}
