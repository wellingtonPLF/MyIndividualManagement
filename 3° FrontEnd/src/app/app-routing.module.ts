import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TelaPrincipalComponent} from "./main/tela-principal/tela-principal.component";
import {CadastroUsuarioComponent} from "./usuario/cadastro-usuario/cadastro-usuario.component";
import {LoginUsuarioComponent} from "./usuario/login-usuario/login-usuario.component";
import {TelaManagementComponent} from "./main/tela-management/tela-management.component";
import {AuthenticationuserComponent} from "./usuario/authenticationuser/authenticationuser.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import { LimitGuardGuard } from './shared/guard/limit-guard.guard';
import { OutlimitComponent } from './management/outlimit/outlimit.component';
import { ExperienceGuard } from './shared/guard/experience.guard';
import { AccessUserComponent } from './main/access-user/access-user.component';

const routes: Routes = [
  {
    path: 'access_user',
    component: AccessUserComponent
  },
  {
    path: 'experience',
    component: TelaManagementComponent,
    canActivate: [ExperienceGuard]
  },
  {
    path: 'management',
    component: TelaManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'management/:id',
    component: TelaManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'',
    component: AppComponent,
    children: [
      {
        path: '',
        component: TelaPrincipalComponent
      },
      {
        path: '',
        component: AuthenticationuserComponent,
        children: [
          {
            path: 'login',
            component: LoginUsuarioComponent
          },
          {
            path: 'outlimit',
            component: OutlimitComponent
          },
          {
            path: 'cadastro',
            component: CadastroUsuarioComponent,
            canActivate: [LimitGuardGuard]
          },
          {
            path: 'management',
            component: TelaManagementComponent,
          },
          {
            path: 'management/:id',
            component: TelaManagementComponent,
          }
          ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
