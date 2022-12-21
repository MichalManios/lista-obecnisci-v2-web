import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iif, Observable, tap } from 'rxjs';
import { Section } from '../model/section.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-add-sections',
  templateUrl: './add-sections.component.html',
  styleUrls: ['./add-sections.component.css']
})
export class AddSectionsComponent implements OnInit {

  sectionForm!: FormGroup;

  @Input()
  section = {} as Section;

  constructor(public dialogRef: MatDialogRef<AddSectionsComponent>,
              private formBuilder: FormBuilder,
              private sectionService: SectionService) {
  }

  ngOnInit(): void {
    this.setForm(this.section);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    iif(() => this.section.id != null, this.updateSection(), this.addNewSection()).subscribe();
  }

  private setForm(section: Section) {
    this.sectionForm = this.formBuilder.group({
      id: [section.id ? section.id : null],
      name: [section.id ? section.name : null, [Validators.required, Validators.minLength(3),
        Validators.maxLength(50)], null, {updateOn: 'blur'}],
    });
  }

  private addNewSection(): Observable<Section> {
    return this.sectionService.addNewSection(this.sectionForm.getRawValue())
      .pipe(tap(section => this.dialogRef.close(section)));
  }

  private updateSection(): Observable<Section> {
    return this.sectionService.updateSection(this.sectionForm.getRawValue())
      .pipe(tap(section => this.dialogRef.close(section)));
  }
}
