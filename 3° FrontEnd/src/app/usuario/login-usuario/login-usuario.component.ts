import {Component, ContentChild, ElementRef, OnInit} from '@angular/core';
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import {Router} from "@angular/router";
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { Auth } from 'src/app/shared/model/auth';
import { userAction } from 'src/app/shared/ngRx/action/system.action';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {
  auth!: Auth;

  //Show Passowrd
  show: boolean = false;
  password: string = 'password';

  //Invalid User
  message!: string;
  senhaInv: boolean = false

  //Numero de Tentativas
  count: number = 0;

  //AlreadyOnline
  signOn: boolean = false;

  //CheckButton
  check!: boolean;

  constructor(private userService: UsuarioService, private authService: AuthService,
    private store: Store<any>, private router: Router) {
    this.auth = new Auth();
  }

  onEnter(){
    this.validateUser()
  }

  ngOnInit(): void {}

  validateUser(): void {
    if (this.auth.username != null && this.auth.password!= null &&
      this.auth.username != "" && this.auth.password!= "") {

      if (this.auth.password.length < 7) {
        this.usuarioInvalido('Invalide User - Please try again!');
        return;
      }

      this.authService.authentication(this.auth).subscribe({
        next: _ => {
          this.userService.getAuthenticatedUser().subscribe(
            {
              next: it => {
                this.store.dispatch(userAction(it.data))
                this.router.navigate(['/management'])
              },
              error: _ => {
                this.usuarioInvalido('Invalide User - Please try again!');
              }
            }
          )
        },
        error: msg => {
          this.usuarioInvalido(msg.error);
        }
      })
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

  usuarioInvalido(msg: string): void{
    this.senhaInv = true
    this.auth.username = '';
    this.auth.password = '';
    this.count += 1;
    this.message = msg;
  }
}
