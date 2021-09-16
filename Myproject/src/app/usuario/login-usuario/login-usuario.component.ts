import {Component, ContentChild, ElementRef, OnInit} from '@angular/core';
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import {Router} from "@angular/router";
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {
  usuario!: Usuario;
  senhaInv: boolean = false
  count: number = 0;
  show: boolean = false;
  password: string = 'password';
  mensage!: string;
  signOn: boolean = false;
  check!: boolean;

  constructor(private ususarioService: UsuarioService,
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
      this.ususarioService.pesquisarPorUsuario(this.usuario).subscribe(
        it => {
          if (it.length != 0){
            if(this.accountServiceLocal.getToken() || this.accountService.getToken()){
              this.mensage = "An user is already sign in!";
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
              this.router.navigate(['/management', it[0].id])
            }
          }
          else {
            this.senhaInv = true
            this.usuario.nome = '';
            this.usuario.senha = this.usuario.nome;
            this.count += 1;
            this.mensage = 'Invalide User! Please try again!';
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
}
