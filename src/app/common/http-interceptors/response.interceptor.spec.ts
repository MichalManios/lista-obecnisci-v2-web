import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { ResponseInterceptor } from './response.interceptor';
import { ErrorHandler } from '../common/error-handler/error-handler.service';
import { ToastService } from '../common/toast/toast.service';
import { LoginAlertService } from '../common/login-alert/login-alert.service';
import { AuthService } from '../auth/auth.service';
import { ContextService } from '../common/context/context.service';
import { KeycloakService } from 'keycloak-angular';
import { AccessDeniedService } from '../common/access-denied/access-denied.service';
import { CheckBrowserDeniedService } from '../common/check-browser-denied/check-browser-denied.service';
import { AppRoutingModule } from '../app-routing.module';

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
        LoginAlertService,
        AuthService,
        ContextService,
        KeycloakService,
        AccessDeniedService,
        CheckBrowserDeniedService]
    });

    http = testBed.inject(HttpTestingController);
    httpClient = testBed.inject(HttpClient);
    responseInterceptor = testBed.inject(ResponseInterceptor);
  });

  it('should create', () => {
    expect(responseInterceptor).toBeTruthy();
  });
});
