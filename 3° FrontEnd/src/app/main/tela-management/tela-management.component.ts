import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {Usuario} from "../../shared/model/usuario";
import {Atividade} from "../../shared/model/atividade";
import { FuncShareService } from 'src/app/shared/utils/func-share.service';
import { ScreenWidthSize } from 'src/app/shared/enum/screenWidthSize';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

@Component({
  selector: 'app-tela-management',
  templateUrl: './tela-management.component.html',
  styleUrls: ['./tela-management.component.scss']
})
export class TelaManagementComponent implements OnInit{
  //Must Be instanced
  user$!: Observable<any>;
  usuario!: Usuario;
  atividade!: Atividade;
  // -------------------------
  hide: boolean = false;
  stopCheck: boolean = false;
  maxWidthScreen: number = ScreenWidthSize.maxWidth;
  windowBool: boolean = window.innerWidth > 642
  isLoggedIn: boolean = false;
  activity$!: Observable<any>;

  constructor(private accountService: SessionStorageService,
              private fshare: FuncShareService, private authService: AuthService,
              private store: Store<any>, private userService: UsuarioService,
              private accountServiceLocal: LocalStorageService) {
    this.atividade = new Atividade('');
    this.usuario = new Usuario();
    this.user$ = this.store.select('userReducer');
    this.activity$ = this.store.select('activityReducer');
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.windowBool = window.innerWidth > 642
      if (window.innerWidth < 645 && this.hide == false) {
        this.hide = true;
        this.fshare.sendClickEvent(this.hide);
      }
    });

    this.user$.subscribe(
      it => {
        this.usuario = {...it}
        this.isLoggedIn = true;
        this.store.dispatch({type: 'activity', payload: { position: 0, list: this.usuario.atividades } })
      }
    )
  }

  ngDoCheck(): void {
    if (this.stopCheck == false) {
      if (this.atividade.janelas.length != 0) {
        this.hide = window.innerWidth < 642
        this.stopCheck = true
      }
    }
  }

  signOut(): void{
    this.accountService.removeToken('my-token');
    this.accountServiceLocal.removeToken('my-token');
  }

  hideLeft(): void {
    this.hide = !this.hide
    this.fshare.sendClickEvent(this.hide);
    this.store.dispatch({type: 'hideLeftSide', payload: this.hide})
  }

  seeValue() {
    // this.activity$.subscribe(
    //   it => {
    //     console.log(`Position: ${it.position}`)
    //     for (let x of it.list) {
    //       console.log(x)
    //     }
    //   }
    // )
  }
}
 