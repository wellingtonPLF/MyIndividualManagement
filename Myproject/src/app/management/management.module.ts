import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtividadeComponent } from './atividade/atividade.component';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
        MatButtonModule,
        NgbModule
    ]
})
export class ManagementModule { }
