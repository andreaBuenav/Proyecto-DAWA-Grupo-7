import { Routes } from '@angular/router';
import { GuardiasComponent } from './guardias/guardias';
import { Login } from './login/login';
import { Inicio } from './inicio/inicio';
import { Lpr } from './lpr/lpr';
import { AdminAudit } from './admin-audit/admin-audit';
import { VisitantesComponent } from './visitantes/visitantes.component';
import { Gestionresidentes } from './gestionresidentes/gestionresidentes';
import { PrincipalModulos } from './principal-modulos/principal-modulos';
import { PanelControl } from './panel-control/panel-control';
import { MenuVertical } from './menu-vertical/menu-vertical';
export const routes: Routes = [
    {path:'', component: Inicio},
    {path:'principal', component: PrincipalModulos},
    {path: 'login', component: Login},
    {path: 'guardias', component: GuardiasComponent},
    {path: 'lpr', component: Lpr},
    {path: 'audit', component: AdminAudit},
    {path: 'visitantes', component: VisitantesComponent},
    {path: 'residentes', component: Gestionresidentes},
    {path: 'panel-control', component: PanelControl}
];
