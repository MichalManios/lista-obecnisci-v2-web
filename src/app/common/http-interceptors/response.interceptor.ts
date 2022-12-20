import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private errorHandler: ErrorHandlerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap(response => this.errorHandler.handleResponse(response, request)),
      catchError((error: any) => {
          this.errorHandler.handleError(error, request);

          return of(error);
        }
      ));
  }
}
