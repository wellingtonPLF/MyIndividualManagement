import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import {Router} from "@angular/router";
import {AccountManagementService} from "../../shared/service/account-management.service";

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {
  usuario!: Usuario;
  senhaInv: boolean = false
  count: number = 0;

  constructor(private ususarioService: UsuarioService,
              private router: Router,
              private accountService: AccountManagementService) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  validateUser(): void{
    if (this.usuario.nome!= null && this.usuario.senha!= null){
      this.ususarioService.pesquisarPorUsuario(this.usuario).subscribe(
        it => {
          if (it.length != 0){
            this.senhaInv = false
            this.count = 0;
            this.accountService.setToken('my-token');
            this.router.navigate(['management'])
          }
          else {
            this.senhaInv = true
            this.usuario.nome = '';
            this.usuario.senha = this.usuario.nome;
            this.count += 1;
          }
        }
      );
    }
  }
}
