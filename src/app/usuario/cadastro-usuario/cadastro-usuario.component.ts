import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/usuario";
import {HttpClient} from "@angular/common/http";
import {AccountManagementService} from "../../shared/service/account-management.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
              private accountManagement: AccountManagementService,
              private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  cadastroUsuario(): void{
    if (this.usuario.nome != null && this.usuario.email != null && this.usuario.senha != null &&
      this.usuario.nome != "" && this.usuario.email != "" && this.usuario.senha != ""){
      this.usuarioService.inserir(this.usuario).subscribe(
        it => {
          this.router.navigate(['management'])
          console.log('Usuario Cadastrado');
        }
      )
    }
  }
}
