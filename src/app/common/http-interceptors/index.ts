import { ResponseInterceptor } from './response.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
];
