import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = '';
  password = '';

  onAccept() {
    alert('Se procederá a validar las credenciales de acceso');
  }
}