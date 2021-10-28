import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/usuario";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {SignupvalidationService} from "../../shared/service/signupvalidation.service";
import {MensagemService} from "../../shared/service/mensagem.service";
import {Atividade} from "../../shared/model/atividade";
import {Janela} from "../../shared/model/janela";
import {TemplateService} from "../../shared/service/template.service";
import {JanelaService} from "../../shared/service/janela.service";
import {Template} from "../../shared/model/template";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  usuario: Usuario;

  //ShowPassword Method
  password: string = 'password';
  repeatpassword: string = 'password';
  showPw: boolean = false;
  showConfirmPassword: boolean = false;

  //Validation Method
  reactiveForm!: FormGroup;
  redinvalideusername: boolean = false;
  redInvalidePassword: boolean = false;
  redInvalideconfirmPassword: boolean = false;
  redInvalideEmail: boolean = false;
  appearemailquestion: boolean = false;
  appearnamequestion: boolean = false;
  toolTipNameInUse: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private router: Router, private validate : SignupvalidationService,
              private snackResult : MensagemService) {
    this.usuario = new Usuario();
    this.reactiveForm = this.validate.createSignupForm();
  }

  get validations (){
    return this.reactiveForm.controls
  }

  ngOnInit(): void {
  }

  validateSignUp(): void{
    this.toolTipNameInUse = false;
    this.appearnamequestion = false;
    this.appearemailquestion = false;
    this.redInvalideEmail = false;
    this.redInvalidePassword = false;
    this.redinvalideusername = false;
    this.redInvalideconfirmPassword = false;

    if(!this.reactiveForm.invalid){
      this.usuarioService.pesquisarPorValidacao(this.usuario).subscribe(
        validar => {
          if (validar.length == 0){
            const atividade = new Atividade("Let's Work")
            let janela = new Janela();
            janela.nome = "Main";
            atividade.janelas.push(janela);
            this.usuario.atividades.push(atividade);
            this.usuarioService.inserir(this.usuario).subscribe(
              it => {
                this.snackResult.success("Cadastro realizado com sucesso!")
                this.router.navigate(['management'])
              }
            )
          }
          else {
            if(validar[0].nome == this.usuario.nome){
              this.redinvalideusername = true;
              this.toolTipNameInUse = true;
              this.appearnamequestion = true;
            }
            if(validar[0].email == this.usuario.email){
              this.redInvalideEmail = true;
              this.appearemailquestion = true;
            }
          }
        }
      )
    }
    else{
      if(this.reactiveForm.controls.password.errors){
        this.redInvalidePassword = true;
      }

      if(this.reactiveForm.controls.confirmPassword.errors){
        this.redInvalideconfirmPassword = true;
      }

      if(this.reactiveForm.controls.username.errors){
        this.redinvalideusername = true;
        this.appearnamequestion = true;
      }

      if(this.reactiveForm.controls.email.errors){
        this.redInvalideEmail = true;
      }
    }
  }

  showpassword(run: string): void{
    if(run == 'password'){
      if (this.password === 'password') {
        this.password = 'text';
        this.showPw = true;
      } else {
        this.password = 'password';
        this.showPw = false;
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
