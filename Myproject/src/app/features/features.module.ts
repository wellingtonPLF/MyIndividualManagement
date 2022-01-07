import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from "@angular/forms";
import { UploadImageComponent } from './upload-image/upload-image.component';



@NgModule({
  declarations: [
    StopwatchComponent,
    UploadImageComponent
  ],
  exports: [
    UploadImageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ]
})
export class FeaturesModule { }
