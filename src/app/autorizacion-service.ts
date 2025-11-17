import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionService {
  
  //Credenciales del sistema
  public usuarioSistema ={
    user: 'admin',
    password: 'admin123',
    nombreUsuario: 'Ernesto'
  };

  //Variable que me permite determinar si está logeado al sistem
    public logeado$ = new BehaviorSubject<boolean>(false);

      // Guarda el nombre del usuario logeado
    public usuarioLogeado$ = new BehaviorSubject<string>('');
}
