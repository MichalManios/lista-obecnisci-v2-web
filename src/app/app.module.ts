import {APP_INITIALIZER,  NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app-components/app-component/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { StartPageComponent } from './app-components/start-page/start-page.component';
import { MenuNavigationComponent } from './app-components/menu-navigation/menu-navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ErrorHandlerService } from './common/error-handler/error-handler.service';
import { httpInterceptorProviders } from './common/http-interceptors';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToastModule } from './common/toast/toast.module';
import { PipesModule } from './common/pipes/pipes.module';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8180/',
        realm: 'Lista-obecnosci-realm',
        clientId: 'Lista-obecnosci-client-public',
      },
      initOptions: {
        pkceMethod: 'S256',
        redirectUri: 'http://localhost:4200/application',
      },loadUserProfileAtStartUp: false
    });
}

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    MenuNavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppRoutingModule,
    MatCardModule,
    MatSidenavModule,
    KeycloakAngularModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    HttpClientModule,
    ToastModule,
    OverlayModule,
    PipesModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [ KeycloakService ],
    },
    ErrorHandlerService,
    httpInterceptorProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
