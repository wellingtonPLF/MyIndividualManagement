import {Component} from '@angular/core';
import {from, Observable} from "rxjs";
import { UsuarioService } from './shared/service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myIndividualManagement';

  constructor(public userService: UsuarioService){

  }

  ngOnInit(): void{
    this.userService.checkHeader().subscribe(
      _ => {}
    )
  }
}
