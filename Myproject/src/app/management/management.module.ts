import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtividadeComponent } from './atividade/atividade.component';
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        AtividadeComponent
    ],
    exports: [
        AtividadeComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class ManagementModule { }
