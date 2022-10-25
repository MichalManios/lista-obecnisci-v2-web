import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkersComponent } from './workers-component/workers.component';

const routes: Routes = [
  {
    path: '',
    component: WorkersComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports:  [RouterModule ]
})
export class WorkersRoutingModule { }
