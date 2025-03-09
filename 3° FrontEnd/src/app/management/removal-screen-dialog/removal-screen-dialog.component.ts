import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-screen-dialog',
  templateUrl: './screen-dialog.component.html',
  styleUrls: ['./screen-dialog.component.scss']
})
export class RemovalScreenDialogComponent implements OnInit {

  @Output() deleteClick = new EventEmitter<any>();
  @Output() cancelClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  remover(): void{
    this.deleteClick.emit()
  }

  onCancel() {
    this.cancelClick.emit();
  }
}
