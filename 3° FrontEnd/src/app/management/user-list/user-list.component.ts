import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/service/usuario.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  user!: Array<any>
  star: boolean = false;

  constructor(private userService: UsuarioService) {
    this.userService.listar().subscribe(
      it => {
        this.user = it
      }
    );
  }

  ngOnInit(): void {
  }

  setStar(): void {
    this.star = !this.star
  }

}
