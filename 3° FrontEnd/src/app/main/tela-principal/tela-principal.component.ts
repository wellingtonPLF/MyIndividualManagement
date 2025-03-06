import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.scss']
})
export class TelaPrincipalComponent implements OnInit {

  conta: boolean = false;
  widthScreen: boolean = window.innerWidth >= 500;
  searchUser: any = { value: '', status: false};

  user$!: Observable<any>;

  isOnline: boolean = false;

  constructor(private usuarioService: UsuarioService, private store: Store<any>, private authService: AuthService) {
    this.user$ = this.store.select('userReducer');
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.widthScreen = window.innerWidth >= 500
    });

    this.usuarioService.getAuthenticatedUser().subscribe(
      {
        next: it => {
          if (parseInt(it.status) == HttpStatusCode.Unauthorized) {
            this.isOnline = true; 
          }
          else {
            this.conta = true;
            this.store.dispatch({type: 'user', payload: it.data})
          }
        },
        error: (e) => {
          this.isOnline = false;
        }
      }
    );
  }

  search(): void{
    this.searchUser.status = !this.searchUser.status;
  }
}
