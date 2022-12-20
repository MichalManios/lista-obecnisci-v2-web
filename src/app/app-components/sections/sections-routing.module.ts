import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionsComponent } from './section-component/sections.component';

const routes: Routes = [
  {
    path: '',
    component: SectionsComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports:  [ RouterModule ]
})
export class SectionsRoutingModule { }
