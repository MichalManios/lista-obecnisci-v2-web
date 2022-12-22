import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private successNotification = 'toast-success';

  private warningNotification = 'toast-warning';

  private dangerNotification = 'toast-danger';

  private infoNotification = 'toast-info';

  constructor(private toast: MatSnackBar) {
  }

  public success(message: string): void {
    this.show(message, this.successNotification);
  }

  public danger(message: string): void {
    this.show(message, this.dangerNotification);
  }

  public warning(message: string): void {
    this.show(message, this.warningNotification);
  }

  public info(message: string): void {
    this.show(message, this.infoNotification);
  }

  private show(text: string, typeOfNotification: string) {
    this.toast.open(text, '',{
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['toast', typeOfNotification]
    });
  }
}
