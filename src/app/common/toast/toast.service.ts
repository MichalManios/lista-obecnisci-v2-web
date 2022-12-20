import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: MatSnackBar) {
  }

  public success(message: string): void {
    this.show(message);
  }

  public danger(message: string): void {
    this.show(message);
  }

  public warning(message: string): void {
    this.show(message);
  }

  public info(message: string): void {
    this.show(message);
  }

  private show(text: string) {
    this.toast.open(text, '',{
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['toast']
    });
  }
}
