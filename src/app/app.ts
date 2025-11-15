import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './cabecera/cabecera';
import { Login } from './login/login';
import { CopyRight } from './copy-right/copy-right';

@Component({
  selector: 'app-root',
  imports: [Cabecera, Login, CopyRight],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('login-project');
}
