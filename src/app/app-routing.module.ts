import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { WorkersComponent } from './workers/workers.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'application', component: StartPageComponent },
  { path: 'workers', component: WorkersComponent }
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
