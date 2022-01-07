import {Component, ContentChild, ElementRef, OnInit} from '@angular/core';
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import {Router} from "@angular/router";
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {
  usuario!: Usuario;

  //Show Passowrd
  show: boolean = false;
  password: string = 'password';

  //Invalid User
  menssage!: string;
  senhaInv: boolean = false

  //Numero de Tentativas
  count: number = 0;

  //AlreadyOnline
  signOn: boolean = false;

  //CheckButton
  check!: boolean;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private accountService: SessionStorageService,
              private accountServiceLocal: LocalStorageService) {
    this.usuario = new Usuario();
  }

  onEnter(){
    this.validateUser()
  }

  ngOnInit(): void {
  }

  validateUser(): void{
    if (this.usuario.nome!= null && this.usuario.senha!= null &&
      this.usuario.nome!= "" && this.usuario.senha!= ""){
      this.usuarioService.getUsuarioByNome(this.usuario.nome).subscribe(
          it => {
            if(it != undefined || it != null){
              if(it.senha == this.usuario.senha){
                if(this.accountServiceLocal.getToken() || this.accountService.getToken()){
                  this.menssage = "An user is already sign in!";
                  this.senhaInv = true;
                  this.signOn = true;
                }
                else {
                  this.senhaInv = false
                  this.count = 0;
                  if (this.check){
                    this.accountServiceLocal.setToken('my-token');
                  }
                  else {
                    this.accountService.setToken('my-token');
                  }
                  this.router.navigate(['/management', it.idusuario])
                }
              }
              else{
                this.usuarioInvalido();
              }
            }
            else{
              this.usuarioInvalido();
            }
          }
      );
    }
  }

  showpassword(): void{
      if (this.password === 'password') {
        this.password = 'text';
        this.show = true;
      } else {
        this.password = 'password';
        this.show = false;
      }
  }

  usuarioInvalido(): void{
    this.senhaInv = true
    this.usuario.nome = '';
    this.usuario.senha = this.usuario.nome;
    this.count += 1;
    this.menssage = 'Invalide User! Please try again!';
  }
}
