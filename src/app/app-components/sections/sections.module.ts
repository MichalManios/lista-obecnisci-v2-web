import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsComponent } from './section-component/sections.component';
import { SectionService } from './section.service';
import { SectionsRoutingModule } from './sections-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {DialogMessageModule} from "../../shared/dialog-message/dialog-message.module";
import { AddSectionsComponent } from './add-sections/add-sections.component';
import {PipesModule} from "../../common/pipes/pipes.module";



@NgModule({
  declarations: [ SectionsComponent, AddSectionsComponent ],
    imports: [
        CommonModule,
        SectionsRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        DialogMessageModule,
        PipesModule
    ],
  exports: [ SectionsComponent ],
  providers: [ SectionService ]
})
export class SectionsModule { }
