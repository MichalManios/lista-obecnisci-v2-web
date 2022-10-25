import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersComponent } from './workers-component/workers.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { WorkersRoutingModule } from './workers-routing.module';



@NgModule({
  declarations: [
    WorkersComponent
  ],
  exports: [
    WorkersComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    WorkersRoutingModule
  ]
})
export class WorkersModule { }
