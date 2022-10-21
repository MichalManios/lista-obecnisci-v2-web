import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { ApplicationComponent } from './application/application.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'application', component: ApplicationComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
