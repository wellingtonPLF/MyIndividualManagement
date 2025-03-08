import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { HttpStatusCode } from '@angular/common/http';
import { ServerService } from 'src/app/shared/service/server/server.service';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.scss']
})
export class TelaPrincipalComponent implements OnInit {

  
  widthScreen: boolean = window.innerWidth >= 500;
  searchUser: any = { value: '', status: false};

  user$!: Observable<any>;
  userSubscription!: Subscription;

  isOnline: boolean = false;
  isOffline: boolean = false;
  conta: boolean = false;

  constructor(private serverService: ServerService, private store: Store<any>, private userService: UsuarioService) {
    this.user$ = this.store.select('userReducer');
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.widthScreen = window.innerWidth >= 500
    });

    this.serverService.getInfo().subscribe(
      {
        next: _ => {
          this.userSubscription = this.user$.subscribe(
            it => {
              if (it.id > 0) {
                this.conta = true
              }
              this.isOnline = true; 
            }
          )
        },
        error: _ => {
          this.isOffline = true;
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  search(): void{
    this.searchUser.status = !this.searchUser.status;
  }
}
