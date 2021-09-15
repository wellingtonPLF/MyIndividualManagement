import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {ActivatedRoute} from "@angular/router";
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";


@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.scss']
})
export class TelaPrincipalComponent implements OnInit {

  conta: boolean = false;
  usuario!: Usuario;

  constructor(private accountService: SessionStorageService, private usuarioService: UsuarioService,
              private accountServiceLocal: LocalStorageService, private navUsuario: ActivatedRoute) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.navUsuario.snapshot.queryParamMap.has('id')) {
      const id = Number(this.navUsuario.snapshot.queryParamMap.get('id'));
      this.usuarioService.pesquisarPorId(id).subscribe(
        it => this.usuario = it
      );
    }
    if(this.accountService.getToken() || this.accountServiceLocal.getToken()){
      this.conta = true;
    }
    else {
      this.conta = false;
    }
  }
}
