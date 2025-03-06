import {Component} from '@angular/core';
import { UsuarioService } from './shared/service/usuario.service';
import { AuthService } from './shared/service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myIndividualManagement';

  constructor(public authService: AuthService){}
  ngOnInit(): void{}
}
