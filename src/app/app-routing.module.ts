import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './app-components/start-page/start-page.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'application', component: StartPageComponent }, //tu może też zastosuj lazy loading dla menu może czcionki też pobierz
  { path: 'workers', loadChildren: () => import('./workers/workers.module').then(m => m.WorkersModule) }
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
