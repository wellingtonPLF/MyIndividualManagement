import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/usuario";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {EmailValidator, FormBuilder, FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {group} from "@angular/animations";
import {CustomValidators} from "../../shared/custom/custom-validators";
import {MatSnackBar, MatSnackBarConfig, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  reactiveForm!: FormGroup;
  usuario: Usuario;
  confirmpassword!: string;
  showPw: boolean = false;
  showConfirmPassword: boolean = false;
  password: string = 'password';
  repeatpassword: string = 'password';
  //Changing color to Red
  invalideusername: boolean = false;
  invalidePassword: boolean = false;
  invalideconfirmPassword: boolean = false;
  invalideEmail: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private router: Router, private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.usuario = new Usuario();
    this.reactiveForm = this.formBuilder.group({
      usernamevalidation: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(5)]),
      passwordvalidation: new FormControl(null,
        [
          Validators.minLength(8),
          Validators.required,
          CustomValidators.patternValidator(/\d/, {hasNumber: true}),
          CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
          CustomValidators.patternValidator(/[^A-Za-z0-9]{3}/, {hasSpecialCharacters: true}),
          CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true})]),
      confirmpasswordvalidation: new FormControl(null,
        [Validators.required]),
      emailvalidation: new FormControl(null,
        [
          Validators.required,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)])
    },{validators: this.MustMatch('passwordvalidation', 'confirmpasswordvalidation')})
  }

  get validations (){
    return this.reactiveForm.controls
  }

  MustMatch(controlName: string, matchingControlName: string){
    return(formgroup: FormGroup) =>{
      const control = formgroup.controls[controlName]
      const matchingcontrol = formgroup.controls[matchingControlName]
      if(matchingcontrol.errors && !matchingcontrol.errors.MustMatch){
        return;
      }
      if(control.value !== matchingcontrol.value){
        matchingcontrol.setErrors({MustMatch:true})
      }
      else {
        matchingcontrol.setErrors(null)
      }
    }
  }

  ngOnInit(): void {
  }

  validateSignUp(): void{
    if(!this.reactiveForm.invalid){
      this.usuarioService.pesquisarPorEmail(this.usuario).subscribe(
        validar => {
          const snackCadastro = new MatSnackBarConfig();
          snackCadastro.politeness = 'assertive';
          snackCadastro.duration = 5000;
          snackCadastro.panelClass = ['success'];

          if (validar.length == 0){
            this.usuarioService.inserir(this.usuario).subscribe(
              it => {
                this.snackBar.open("Cadastro realizado com sucesso!", 'X', snackCadastro);
                this.router.navigate(['management'])
                console.log('Usuario Cadastrado');
              }
            )
          }
          else {
            this.snackBar.open("Esse e-mail já foi cadastrado!", 'X', snackCadastro);
          }
        }
      )
    }
    else{
      if(this.reactiveForm.controls.passwordvalidation.errors){
        this.invalidePassword = true;
      }
      else {
        this.invalidePassword = false;
      }

      if(this.reactiveForm.controls.confirmpasswordvalidation.errors){
        this.invalideconfirmPassword = true;
      }
      else {
        this.invalideconfirmPassword = false;
      }

      if(this.reactiveForm.controls.usernamevalidation.errors){
        this.invalideusername = true;
      }
      else {
        this.invalideusername = false;
      }

      if(this.reactiveForm.controls.emailvalidation.errors){
        this.invalideEmail = true;
      }
      else {
        this.invalideEmail = false;
      }
    }
  }

  showpassword(): void{
    if (this.password === 'password') {
      this.password = 'text';
      this.showPw = true;
    } else {
      this.password = 'password';
      this.showPw = false;
    }
  }

  showconfirmpassword(): void{
    if (this.repeatpassword === 'password') {
      this.repeatpassword = 'text';
      this.showConfirmPassword = true;
    } else {
      this.repeatpassword = 'password';
      this.showConfirmPassword = false;
    }
  }
}
