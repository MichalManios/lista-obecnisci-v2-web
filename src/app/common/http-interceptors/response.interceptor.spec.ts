import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ResponseInterceptor } from './response.interceptor';
import { AppRoutingModule } from '../../app-routing.module';
import { ErrorHandler } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { KeycloakService } from 'keycloak-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('ResponseInterceptor', () => {
  let http: HttpTestingController;

  let httpClient: HttpClient;

  let responseInterceptor: ResponseInterceptor;

  beforeEach(() => {
    const testBed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppRoutingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
        ErrorHandler,
        ResponseInterceptor,
        ToastService,
        KeycloakService,
        MatSnackBar,
        Overlay ]
    });

    http = testBed.inject(HttpTestingController);
    httpClient = testBed.inject(HttpClient);
    responseInterceptor = testBed.inject(ResponseInterceptor);
  });

  it('should create', () => {
    expect(responseInterceptor).toBeTruthy();
  });
});
