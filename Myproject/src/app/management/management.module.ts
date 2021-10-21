import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtividadeComponent } from './atividade/atividade.component';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
    declarations: [
        AtividadeComponent
    ],
    exports: [
        AtividadeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule
    ]
})
export class ManagementModule { }
