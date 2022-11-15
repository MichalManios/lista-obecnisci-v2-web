import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersComponent } from './workers-component/workers.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { WorkersRoutingModule } from './workers-routing.module';
import { AddWorkersComponent } from './add-workers/add-workers.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WorkersService } from './workers.service';



@NgModule({
  declarations: [
    WorkersComponent,
    AddWorkersComponent
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
    WorkersRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [ WorkersService ]
})
export class WorkersModule { }
