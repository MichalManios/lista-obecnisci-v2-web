import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { StartPageComponent } from './start-page/start-page.component';
import { ApplicationComponent } from './application/application.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    ApplicationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    AppRoutingModule,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
