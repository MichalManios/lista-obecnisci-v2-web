import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MenuStateService } from '../../../shared/menu-state/menu-state.service';
import { iif, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddWorkersComponent } from '../add-workers/add-workers.component';
import { WorkerFlattened } from '../models/worker-flattened.interface';
import { WorkersService } from '../workers.service';
import { Section } from '../../sections/model/section.interface';
import { SectionService } from '../../sections/section.service';
import { DialogMessageComponent } from '../../../shared/dialog-message/dialog-message/dialog-message.component';
import { DialogMessageEnum } from '../../../shared/dialog-message/dialog-message/dialog-message.enum';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit, OnDestroy {

  sections!: Section[];

  sectionName = '';

  isMenuOpen!: boolean;

  displayedColumns: string[] = ['lp', 'name', 'surname', 'function', 'buttons'];

  dataSource!: WorkerFlattened[];

  displayOrder = ['function', 'surname', 'name']; //sortowanie odrębne po funkcjach: kierownik zastępca itd...

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscriptions$: Subscription = new Subscription();

  constructor(private menuStateService: MenuStateService,
              public dialog: MatDialog,
              private workerService: WorkersService,
              private sectionService: SectionService) {
  }

  ngOnInit(): void {
    this.getCurrentStateMenu();
    this.initData();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  addWorker(): void {
    const dialogRef = this.getAddWorkerComponent();

    const subscription$ = dialogRef.afterClosed()
      .pipe(tap(result => this.dataSource = result != null ? [...this.dataSource, result] : this.dataSource))
        .subscribe();

    this.subscriptions$.add(subscription$);
  }

  updateWorker(worker: WorkerFlattened): void {
    const dialogRef = this.getAddWorkerComponent();

    dialogRef.componentInstance.workerFlattened = worker;
    dialogRef.componentInstance.sectionName = this.sectionName;
    const subscription$ = dialogRef.afterClosed().pipe(
      tap(workerFlattened => this.dataSource = this.getUpdatedDataSource(workerFlattened))).subscribe();

    this.subscriptions$.add(subscription$);
  }

  deleteWorker(workerId: number): void {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.messageText = 'Czy na pewno chcesz usunąć pracownika/funkcjonariusza?';
    const subscription$ = dialogRef.afterClosed().pipe(
      switchMap(dialogMessage =>  iif(() => dialogMessage === DialogMessageEnum.YES,
        this.delete(workerId),
        of(null)))
    )
      .subscribe();

    this.subscriptions$.add(subscription$);
  }

  private getAllSections(): Observable<Section[]> {
    return this.sectionService.getAllSections();
  }

  private getWorkersBySection(sectionName: string): Observable<WorkerFlattened[]> {
    return this.workerService.getAllWorkersBySectionName(sectionName);
  }

  private initData(): void {
    const subscription$ = this.getAllSections().pipe(
      tap(sections => this.sections = sections),
      tap(sections => this.sectionName = sections[0].name),
      switchMap(sections => this.getWorkersBySection(sections[0].name)),
      tap(workers => this.dataSource = workers)
    ).subscribe();

    this.subscriptions$.add(subscription$);
  }

  private getCurrentStateMenu(): void {
    const subscription$ = this.menuStateService.currentStateManu
      .pipe(tap(state => this.isMenuOpen = state)).subscribe();

    this.subscriptions$.add(subscription$);
  }

  private delete(workerId: number): Observable<WorkerFlattened> {
    return this.workerService.deleteWorker(workerId).pipe(
      tap(workerDeleted => this.dataSource = this.dataSource.filter(worker => worker.id !== workerDeleted.id)));
  }

  private getAddWorkerComponent(): MatDialogRef<AddWorkersComponent, any> {
    return this.dialog.open(AddWorkersComponent, {
      disableClose: true,
      width: '540px',
      data: {},
    });
  }

  private getUpdatedDataSource(workerFlattened: WorkerFlattened): WorkerFlattened[] {
    this.dataSource[this.dataSource.findIndex(({ id }) => id === workerFlattened.id)] = workerFlattened;
    return [...this.dataSource];
  }
}
