import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TelaPrincipalComponent} from "./main/tela-principal/tela-principal.component";
import {CadastroUsuarioComponent} from "./usuario/cadastro-usuario/cadastro-usuario.component";
import {LoginUsuarioComponent} from "./usuario/login-usuario/login-usuario.component";
import {TelaManagementComponent} from "./main/tela-management/tela-management.component";
import {AuthenticationuserComponent} from "./usuario/authenticationuser/authenticationuser.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./shared/guard/auth.guard";

const routes: Routes = [
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
            path: 'cadastro',
            component: CadastroUsuarioComponent
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
