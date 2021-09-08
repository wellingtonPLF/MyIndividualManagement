import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { AuthenticationuserComponent } from './authenticationuser/authenticationuser.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CadastroUsuarioComponent,
    LoginUsuarioComponent,
    AuthenticationuserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ]
})
export class UsuarioModule { }
