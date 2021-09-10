import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";


@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.scss']
})
export class TelaPrincipalComponent implements OnInit {

  conta: boolean = false;

  constructor(private accountService: SessionStorageService,
              private accountServiceLocal: LocalStorageService) {}

  ngOnInit(): void {
    if(this.accountService.getToken() || this.accountServiceLocal.getToken()){
      this.conta = true;
    }
    else {
      this.conta = false;
    }
  }
}
