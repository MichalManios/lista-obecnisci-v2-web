import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './app-components/start-page/start-page.component';
import { AuthKeyClockGuard } from './security/auth-guard/auth.route';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'application', component: StartPageComponent, canActivate: [AuthKeyClockGuard],
    data: { roles: ['AUTHORIZED_USER', 'ADMINISTRATOR'] } },
  { path: 'workers', canActivate: [AuthKeyClockGuard], data: { roles: ['AUTHORIZED_USER', 'ADMINISTRATOR'] },
    loadChildren: () => import('./workers/workers.module').then(m => m.WorkersModule) }
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
