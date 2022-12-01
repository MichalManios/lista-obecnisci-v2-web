import {Component, Input, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogMessageEnum } from './dialog-message.enum';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit {

  @Input()
  messageText!: string;

  constructor(public dialogRef: MatDialogRef<DialogMessageComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(DialogMessageEnum.NO);
  }

  onYesClick(): void {
    this.dialogRef.close(DialogMessageEnum.YES);
  }
}
