import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AccountManagementService} from "../../shared/service/account-management.service";

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.scss']
})
export class TelaPrincipalComponent implements OnInit {

  conta: boolean = false;

  constructor(private accountService: AccountManagementService) {}

  ngOnInit(): void {
    if(this.accountService.getToken()){
      this.conta = true;
    }
    else {
      this.conta = false;
    }
  }
}
