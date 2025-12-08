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
import { LayoutMenu } from './layout-menu/layout-menu';
import { LayoutSimple } from './layout-simple/layout-simple';
export const routes: Routes = [
  {
    path: '',
    component: LayoutSimple,  // tu layout sin menú
    children: [
      { path: '', component: Inicio },
      { path: 'login', component: Login },
      { path: 'principal', component: PrincipalModulos }
    ]
  },

  // Layout con menú lateral
  {
    path:'app',
    component: LayoutMenu,
    children: [
        { path: 'guardias', component: GuardiasComponent },
        { path: 'residentes', component: Gestionresidentes },
        { path: 'audit', component: AdminAudit },
        { path: 'visitantes', component: VisitantesComponent },
        { path: 'lpr', component: Lpr },
        { path: 'panel-control', component: PanelControl }
    ]
  },

  { path: '**', redirectTo: '' }
];