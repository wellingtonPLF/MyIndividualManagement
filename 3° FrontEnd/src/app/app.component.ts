import {Component} from '@angular/core';
import { UsuarioService } from './shared/service/usuario.service';
import { HttpStatusCode } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myIndividualManagement';

  constructor(private store: Store<any>, private userService: UsuarioService){}
  
  ngOnInit(): void{
    this.userService.getAuthenticatedUser().subscribe(
      {
        next: it => {
          if (parseInt(it.status) != HttpStatusCode.Unauthorized) {
            this.store.dispatch({type: 'user', payload: it.data}) 
          }
        },
        error: _ => {}
      }
    )
  }
}
