import { Routes } from '@angular/router';
import { GuardiasComponent } from './guardias/guardias';
import { Login } from './login/login';
import { Inicio } from './inicio/inicio';
import { Lpr } from './lpr/lpr';
export const routes: Routes = [
    {path:'', component: Inicio},
    {path:'principal', component: Inicio},
    {path: 'login', component: Login},
    {path: 'guardias', component: GuardiasComponent},
    {path: 'lpr', component: Lpr}
];
