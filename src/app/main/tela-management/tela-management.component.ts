import { Component, OnInit } from '@angular/core';
import {AccountManagementService} from "../../shared/service/account-management.service";

@Component({
  selector: 'app-tela-management',
  templateUrl: './tela-management.component.html',
  styleUrls: ['./tela-management.component.scss']
})
export class TelaManagementComponent implements OnInit {

  constructor(private accountService: AccountManagementService) { }

  ngOnInit(): void {
  }

  signOut(): void{
    this.accountService.removeToken('my-token');
  }
}
