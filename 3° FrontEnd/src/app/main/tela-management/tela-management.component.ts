import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/usuario";
import {Atividade} from "../../shared/model/atividade";
import {MatDialog} from "@angular/material/dialog";
import { FuncShareService } from 'src/app/shared/utils/func-share.service';
import { ScreenWidthSize } from 'src/app/shared/enum/screenWidthSize';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tela-management',
  templateUrl: './tela-management.component.html',
  styleUrls: ['./tela-management.component.scss']
})
export class TelaManagementComponent implements OnInit{
  usuario!: Usuario;
  atividade!: Atividade;
  hide: boolean = false;
  stopCheck: boolean = false;
  maxWidthScreen: number = ScreenWidthSize.maxWidth;
  windowBool: boolean = window.innerWidth > 642

  variable$!: Observable<any>;

  constructor(private accountService: SessionStorageService, private rotalAtual: ActivatedRoute,
              private dialog: MatDialog, private fshare: FuncShareService, private store: Store<any>,
              private accountServiceLocal: LocalStorageService, private usuarioService: UsuarioService) {
    // Initiated to solve ExpressionChangedAfterItHasBeenCheckedError
    this.atividade = new Atividade('');
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.windowBool = window.innerWidth > 642
      if (window.innerWidth < 645 && this.hide == false) {
        this.hide = true;
        this.fshare.sendClickEvent(this.hide);
      }
    });

    if (this.rotalAtual.snapshot.paramMap.has('id')) {
      const id = Number(this.rotalAtual.snapshot.paramMap.get('id'));
      this.usuarioService.pesquisarPorId(id).subscribe(
        it => {
          this.usuario = it
        }
      );
    }
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

  enviarJanela(evento: Atividade): void{
    this.atividade = evento;
  }

  hideLeft(): void {
    this.hide = !this.hide
    this.fshare.sendClickEvent(this.hide);
    this.store.dispatch({type: 'hideLeftSide', payload: this.hide})
  }
}
