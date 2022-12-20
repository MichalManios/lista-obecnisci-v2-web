import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from '../../sections/section.service';
import {iif, Observable, tap} from 'rxjs';
import { Section } from '../../sections/model/section.interface';
import { FunctionService } from '../../function/function.service';
import { FunctionDTO } from '../../function/model/function-dto.interface';
import { WorkersService } from '../workers.service';
import { WorkerFlattened } from '../models/worker-flattened.interface';

@Component({
  selector: 'app-add-workers',
  templateUrl: './add-workers.component.html',
  styleUrls: ['./add-workers.component.css']
})
export class AddWorkersComponent implements OnInit {

  workerForm!: FormGroup;

  sections$!: Observable<Section[]>;

  functions$!: Observable<FunctionDTO[]>;

  @Input()
  workerFlattened = {} as WorkerFlattened;

  @Input()
  sectionName = '';

  constructor(public dialogRef: MatDialogRef<AddWorkersComponent>,
              private formBuilder: FormBuilder,
              private sectionService: SectionService,
              private functionService: FunctionService,
              private workerService: WorkersService) {
  }

  ngOnInit(): void {
    this.setForm(this.workerFlattened);
    this.sections$ = this.getSections();
    this.functions$ = this.getFunctions();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    iif(() => this.workerFlattened.id != null, this.updateWorker(), this.addNewWorker()).subscribe();
  }

  getSections(): Observable<Section[]> {
    return this.sectionService.getAllSections().pipe(tap(sections =>
      this.workerForm.patchValue({ section: this.workerFlattened.id
          ? sections.find(({ name}) => name === this.sectionName)
          : null })));
  }

  getFunctions(): Observable<FunctionDTO[]> {
    return this.functionService.getAllFunctions().pipe(tap(functions =>
      this.workerForm.patchValue({ function: this.workerFlattened.id
          ? functions.find(({ description}) => description === this.workerFlattened.function)
          : null })));
  }

  private setForm(workerFlattened: WorkerFlattened) {
    this.workerForm = this.formBuilder.group({
      id: [workerFlattened.id ? workerFlattened.id : null],
      name: [workerFlattened.id ? workerFlattened.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)], null, {updateOn: 'blur'}],
      surname: [workerFlattened.id ? workerFlattened.surname : null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)], null, {updateOn: 'blur'}],
      section: [null, [Validators.required], null, {updateOn: 'blur'}],
      function: [null, [Validators.required], null, {updateOn: 'blur'}]
    });
  }

  private addNewWorker(): Observable<WorkerFlattened> {
    return this.workerService.addNewWorker(this.workerForm.getRawValue())
      .pipe(tap(worker => this.dialogRef.close(worker)));
  }

  private updateWorker(): Observable<WorkerFlattened> {
    return this.workerService.updateWorker(this.workerForm.getRawValue())
      .pipe(tap(worker => this.dialogRef.close(worker)));
  }
}
