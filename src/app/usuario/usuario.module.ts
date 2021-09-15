import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { AuthenticationuserComponent } from './authenticationuser/authenticationuser.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";



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
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class UsuarioModule { }
