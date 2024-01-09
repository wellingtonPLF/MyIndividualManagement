import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/usuario";
import {Atividade} from "../../shared/model/atividade";
import {MatDialog} from "@angular/material/dialog";
import { FuncShareService } from 'src/app/shared/utils/func-share.service';

@Component({
  selector: 'app-tela-management',
  templateUrl: './tela-management.component.html',
  styleUrls: ['./tela-management.component.scss']
})
export class TelaManagementComponent implements OnInit{
  usuario!: Usuario;
  atividade!: Atividade;
  hide: boolean = false;

  constructor(private accountService: SessionStorageService, private rotalAtual: ActivatedRoute,
              private dialog: MatDialog, private fshare: FuncShareService,
              private accountServiceLocal: LocalStorageService, private usuarioService: UsuarioService) {
    // Initiated to solve ExpressionChangedAfterItHasBeenCheckedError
    this.atividade = new Atividade('');
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.rotalAtual.snapshot.paramMap.has('id')) {
      const id = Number(this.rotalAtual.snapshot.paramMap.get('id'));
      this.usuarioService.pesquisarPorId(id).subscribe(
        it => {
          this.usuario = it
        }
      );
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
  }
}
