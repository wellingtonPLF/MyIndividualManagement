import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaPrincipalComponent } from './tela-principal/tela-principal.component';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { TelaManagementComponent } from './tela-management/tela-management.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatTabsModule} from "@angular/material/tabs";
import {ManagementModule} from "../management/management.module";
import {FeaturesModule} from "../features/features.module";
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        TelaPrincipalComponent,
        TelaManagementComponent
    ],
    exports: [
        TelaPrincipalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogModule,
        MatTreeModule,
        MatTabsModule,
        RouterModule,
        ManagementModule,
        FeaturesModule
    ]
})
export class MainModule { }
