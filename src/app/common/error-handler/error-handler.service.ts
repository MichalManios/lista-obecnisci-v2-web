import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpRequest, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {ToastService} from "../toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private toast: ToastService) {
  }

  handleError(error: any, request: HttpRequest<any>): void {
    if (this.isUnprocessableEntity(error)) {
      this.displayWarning(error);
    } else if (this.isDataBaseConstraintError(error)) {
      this.convertError(request);
    } else {
      if (environment.production) {
        this.displayWarning(error);
      }
      this.commonError();
    }
  }

  handleResponse(response: any, request: HttpRequest<any>): void {
    if (response instanceof HttpResponse) {
      if (response.status === 201
        || (request.method === 'PUT' && response.status === 200)) {
        this.toast.success('Zmiany zostały zapisane.');
      } else if (response.status === 200
        && request.method === 'DELETE') {
        this.toast.success('Element został usunięty.');
      }
    }
  }

  private isDataBaseConstraintError(error: { status: number; }): boolean {
    return error instanceof HttpErrorResponse
      && error.status === 409;
  }

  private isUnprocessableEntity(error: { status: number; }): boolean {
    return error instanceof HttpErrorResponse
      && error.status === 422;
  }

  private convertError(request: HttpRequest<any>): void {
    if (request.method === 'DELETE') {
      this.toast.warning('Nie można usunąć pozycji, ponieważ jest wykorzystywana!');
    } else if (request.method === 'POST' || request.method === 'PUT') {
      this.toast.warning('Podobny wpis już istnieje!');
    } else {
      this.commonError();
    }
  }

  private displayWarning(error: { error: { message: string; error_description: string; }; }) {
    if (error.error.message) {
      this.toast.warning(error.error.message);
    }

    if (error.error.error_description) {
      this.toast.warning(error.error.error_description);
    }
  }

  private commonError() {
    this.toast.danger('Wystąpił błąd aplikacji. Skontaktuj się z pomocą techniczną.');
  }
}
