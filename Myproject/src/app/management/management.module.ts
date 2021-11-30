import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtividadeComponent } from './atividade/atividade.component';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { WorkspaceComponent } from './workspace/workspace.component';
import { ThoseSubareasComponent } from './those-subareas/those-subareas.component';
import { OcupacaoGeralComponent } from './ocupacao-geral/ocupacao-geral.component';
import { ClasseCreationComponent } from './classe-creation/classe-creation.component';
import {RouterModule} from "@angular/router";
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
    declarations: [
        AtividadeComponent,
        EditDialogComponent,
        WorkspaceComponent,
        ThoseSubareasComponent,
        OcupacaoGeralComponent,
        ClasseCreationComponent,
        TaskDialogComponent,
        CarouselComponent
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
        RouterModule,
        MatDialogModule
    ]
})
export class ManagementModule { }
