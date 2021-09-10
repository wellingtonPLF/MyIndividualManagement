import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/usuario";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {EmailValidator} from "@angular/forms";
import {ValidateEmailService} from "../../shared/service/validate-email.service";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  usuario: Usuario;
  confirmpassword!: string;
  showPw: boolean = false;
  showConfirmPassword: boolean = false;
  password: string = 'password';
  repeatpassword: string = 'password';
  invalidePassword: boolean = false;
  invalideEmail: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private router: Router, private emailvalidation: ValidateEmailService) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  cadastroUsuario(): void{
    if (this.usuario.nome != null && this.usuario.email != null && this.usuario.senha != null &&
      this.usuario.nome != "" && this.usuario.email != "" && this.usuario.senha != ""){
      if(this.confirmpassword === this.usuario.senha){
        this.invalidePassword = false;
        if(this.emailvalidation.validate(this.usuario.email) != 'Invalid'){
          this.invalideEmail = false;
          this.usuarioService.inserir(this.usuario).subscribe(
            it => {
              this.router.navigate(['management'])
              console.log('Usuario Cadastrado');
            }
          )
        }
        else{
          this.invalideEmail = true;
        }
      }
      else {
        this.invalidePassword = true;
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
