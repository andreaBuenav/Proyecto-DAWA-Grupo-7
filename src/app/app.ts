import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Cabecera } from './cabecera/cabecera';
import { Login } from './login/login';
import { CopyRight } from './copy-right/copy-right';

@Component({
  selector: 'app-root',
  imports: [Cabecera, Login, CopyRight, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('login-project');
 constructor(public readonly router: Router) {}
 
 }