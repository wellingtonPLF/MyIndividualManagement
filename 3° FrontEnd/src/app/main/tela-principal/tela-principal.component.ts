import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { HttpStatusCode } from '@angular/common/http';
import { ServerService } from 'src/app/shared/service/server/server.service';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.scss']
})
export class TelaPrincipalComponent implements OnInit {

  
  widthScreen: boolean = window.innerWidth >= 500;
  searchUser: any = { value: '', status: false};

  user$!: Observable<any>;

  isOnline: boolean = false;
  isOffline: boolean = false;
  conta: boolean = false;

  constructor(private serverService: ServerService, private store: Store<any>, private userService: UsuarioService) {
    this.user$ = this.store.select('userReducer');
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.widthScreen = window.innerWidth >= 500
    });

    this.serverService.getInfo().subscribe(
      {
        next: _ => {
          this.userService.getAuthenticatedUser().subscribe(
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
              error: _ => {}
            }
          )
        },
        error: (e) => {
          this.isOffline = true;
        }
      }
    )
  }

  search(): void{
    this.searchUser.status = !this.searchUser.status;
  }
}
