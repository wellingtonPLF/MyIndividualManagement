import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/usuario";
import {Atividade} from "../../shared/model/atividade";
import {MatDialog} from "@angular/material/dialog";
import {IndisponivelComponent} from "../../management/indisponivel/indisponivel.component";
import {StopwatchComponent} from "../../features/stopwatch/stopwatch.component";

@Component({
  selector: 'app-tela-management',
  templateUrl: './tela-management.component.html',
  styleUrls: ['./tela-management.component.scss']
})
export class TelaManagementComponent implements OnInit{
  usuario!: Usuario;
  atividade!: Atividade;

  constructor(private accountService: SessionStorageService, private rotalAtual: ActivatedRoute,
              private dialog: MatDialog,
              private accountServiceLocal: LocalStorageService, private usuarioService: UsuarioService) {
    this.usuario = new Usuario();
    // Initiated to solve ExpressionChangedAfterItHasBeenCheckedError
    this.atividade = new Atividade('');
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

  search(): void{
    this.dialog.open(StopwatchComponent, {
      panelClass: 'dialogPadding'
    })
  }
}
