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
import { IndisponivelComponent } from './indisponivel/indisponivel.component';
import { RemovalScreenDialogComponent } from './removal-screen-dialog/removal-screen-dialog.component';
import { ClasseInfoComponent } from './classe-info/classe-info.component';
import { TemplatesComponent } from './templates/templates.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { OcupacaoNominalComponent } from './ocupacao-nominal/ocupacao-nominal.component';
import { OcupacaoListComponent } from './ocupacao-list/ocupacao-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
    declarations: [
        AtividadeComponent,
        EditDialogComponent,
        WorkspaceComponent,
        ThoseSubareasComponent,
        OcupacaoGeralComponent,
        ClasseCreationComponent,
        TaskDialogComponent,
        CarouselComponent,
        IndisponivelComponent,
        RemovalScreenDialogComponent,
        ClasseInfoComponent,
        TemplatesComponent,
        OcupacaoNominalComponent,
        OcupacaoListComponent
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
        MatCardModule,
        MatFormFieldModule,
        MatPaginatorModule,
        RouterModule,
        DragDropModule,
        MatDialogModule,
        BrowserModule,
        BrowserAnimationsModule
    ]
})
export class ManagementModule { }
