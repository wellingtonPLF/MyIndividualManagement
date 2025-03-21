import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MainModule} from "./main/main.module";
import {RouterModule} from "@angular/router";
import {UsuarioModule} from "./usuario/usuario.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { DialogComponent } from './dialogs/dialog/dialog.component';
import {FormsModule} from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { reducers } from './shared/ngRx/store';
import { CorsInterceptorService } from './interceptor/cors-interceptor.service';
import { AuthInterceptor } from './shared/middleware/auth.interceptor';

const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptorService, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MainModule,
        MatDialogModule,
        MatButtonModule,
        UsuarioModule,
        RouterModule,
        FormsModule,
        NgbModule,
        // StoreModule.forRoot({}, {})
        StoreModule.forRoot(reducers)
    ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
