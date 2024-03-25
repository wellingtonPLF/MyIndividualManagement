import {Component} from '@angular/core';
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

  ngOnInit(): void{}
}
