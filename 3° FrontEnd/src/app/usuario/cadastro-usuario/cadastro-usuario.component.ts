import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/usuario";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {SignupvalidationService} from "../../shared/service/signupvalidation.service";
import {MensagemService} from "../../shared/service/mensagem.service";
import {TemplateService} from "../../shared/service/template.service";
import {SubareaService} from "../../shared/service/subarea.service";
import {UsuarioFactory} from "../../shared/factoryDirectory/usuarioFactory";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  usuario: Usuario;

  //ShowPassword
  password: string = 'password';
  showPassword: boolean = false;
  repeatpassword: string = 'password';
  showConfirmPassword: boolean = false;

  //Validation
  reactiveForm!: FormGroup;
  invalid: Array<string> = [];

  constructor(private usuarioService: UsuarioService, private templateService: TemplateService,
              private router: Router, private validate : SignupvalidationService,
              private subareaService: SubareaService,
              private snackResult : MensagemService) {
    this.usuario = new Usuario();
    this.reactiveForm = this.validate.createSignupForm();
  }

  ngOnInit(): void {}

  validations(): any{
    return this.reactiveForm.controls
  }

  validateSignUp(): void{
    this.invalid = []

    if(!this.reactiveForm.invalid){
      this.usuarioService.pesquisarPorValidacao(this.usuario).subscribe(
        validar => {
          if (validar.length == 0){
            this.templateService.pesquisarPorId(1).subscribe(
              result => {
                UsuarioFactory.criarUsuario(result, this.usuario)
                this.usuarioService.inserir(this.usuario).subscribe({
                    next: _ => {
                      this.snackResult.success("Cadastro realizado com sucesso!")
                      this.router.navigate(['management'])
                    },
                    error: (_) => {
                      console.log("Limit Users")
                    }
                  }
                )
              }
            )
          }
          else {
            if(validar[0].nome == this.usuario.nome){
              this.invalid.push('username')
              this.invalid.push('nameInUse')
            }
            if(validar[0].email == this.usuario.email){
              this.invalid.push('email')
              this.invalid.push('emailInUse')
            }
          }
        }
      )
    }
    else{
      if(this.reactiveForm.controls.password.errors){
        this.invalid.push('password')
      }

      if(this.reactiveForm.controls.confirmPassword.errors){
        this.invalid.push('confirmPassword')
      }

      if(this.reactiveForm.controls.username.errors){
        this.invalid.push('username');
        this.invalid.push('atleastfive');
      }

      if(this.reactiveForm.controls.email.errors){
        this.invalid.push('email');
        this.invalid.push('fakeMail');
      }
    }
  }

  showpassword(run: string): void{
    if(run == 'password'){
      if (this.password === 'password') {
        this.password = 'text';
        this.showPassword = true;
      } else {
        this.password = 'password';
        this.showPassword = false;
      }
    }
    if(run == 'confirmPassword'){
      if (this.repeatpassword === 'password') {
        this.repeatpassword = 'text';
        this.showConfirmPassword = true;
      } else {
        this.repeatpassword = 'password';
        this.showConfirmPassword = false;
      }
    }
  }
}
