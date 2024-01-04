import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {ActivatedRoute} from "@angular/router";
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import {IndisponivelComponent} from "../../management/indisponivel/indisponivel.component";

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.scss']
})
export class TelaPrincipalComponent implements OnInit {

  conta: boolean = false;
  widthScreen: boolean = window.innerWidth >= 500;
  searchUser: any = { value: '', status: false};
  usuario!: Usuario;

  constructor(private accountService: SessionStorageService, private usuarioService: UsuarioService,
              private dialog: MatDialog,
              private accountServiceLocal: LocalStorageService, private navUsuario: ActivatedRoute) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
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
        it => this.usuario = it
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
