import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtividadeComponent } from './atividade/atividade.component';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { WorkspaceComponent } from './workspace/workspace.component';


@NgModule({
    declarations: [
        AtividadeComponent,
        EditDialogComponent,
        WorkspaceComponent
    ],
  exports: [
    AtividadeComponent,
    WorkspaceComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        NgbModule,
        MatDialogModule,
    ]
})
export class ManagementModule { }
