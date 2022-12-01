import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ DialogMessageComponent ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    DialogMessageComponent
  ],
})
export class DialogMessageModule { }
