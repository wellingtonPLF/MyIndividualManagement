import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
  usuario!: Usuario;

  isOnline: boolean = false;

  constructor(private accountService: SessionStorageService, private usuarioService: UsuarioService,
              private store: Store<any>, private accountServiceLocal: LocalStorageService) {
    this.user$ = this.store.select('userReducer');
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.usuarioService.isLoggedIn().subscribe(
      {
        next: _ => {
          this.isOnline = true;
        },
        error: () => {}
      }
    )

    window.addEventListener('resize', () => {
      this.widthScreen = window.innerWidth >= 500
    });

    if(this.accountService.getToken() || this.accountServiceLocal.getToken()){
      let usuarioID = this.accountService.getToken();

      if (usuarioID == null){
        usuarioID = this.accountServiceLocal.getToken();

        if(usuarioID == null){
          usuarioID = "0";
        }
      }

      this.usuarioService.pesquisarPorId(parseInt(usuarioID)).subscribe(
        {
          next: it => {
            this.usuario = it;
            this.store.dispatch({type: 'user', payload: it})
          },
          error: () => {
            this.user$.subscribe(
              it => {
                this.usuario = {...it}
              }
            )
          }
        }
      );
      this.conta = true;
    }
    else {
      this.conta = false;
    }
  }

  search(): void{
    this.searchUser.status = !this.searchUser.status;
  }
}
