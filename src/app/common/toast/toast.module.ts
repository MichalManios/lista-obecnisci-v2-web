import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [  ],
  imports: [
    CommonModule
  ],
  exports: [ ],
  providers: [ ToastService, MatSnackBar ]
})
export class ToastModule { }
