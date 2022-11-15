import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MenuStateService } from '../../shared/menu-state.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddWorkersComponent } from '../add-workers/add-workers.component';
import { WorkerFlattened } from '../models/worker-flattened.interface';
import { WorkersService } from '../workers.service';
import { Section } from '../../app-components/sections/model/section.interface';
import { SectionService } from '../../app-components/sections/section.service';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscriptions$: Subscription[] = [];

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
    this.unsubscribeAllSubscriptions();
  }

  addWorkers(): void {
    const dialogRef = this.dialog.open(AddWorkersComponent, {
      disableClose: true,
      width: '540px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private getAllSections() {
    return this.sectionService.getAllSections();
  }

  private getWorkersBySection(sectionName: string) {
    return this.workerService.getAllWorkersBySectionName(sectionName);
  }

  private initData() {
    const subscription$ = this.getAllSections().pipe(
      tap(sections => this.sections = sections),
      tap(sections => this.sectionName = sections[0].name),
      switchMap(sections => this.getWorkersBySection(sections[0].name)),
      tap(workers => this.dataSource = workers)
    ).subscribe();

    this.addSubscriptionToUnsubscribe(subscription$);
  }

  private getCurrentStateMenu(): void {
    const subscription$ = this.menuStateService.currentStateManu
      .pipe(tap(state => this.isMenuOpen = state)).subscribe();

    this.addSubscriptionToUnsubscribe(subscription$);
  }

  private addSubscriptionToUnsubscribe(subscription: Subscription): void {
    this.subscriptions$.push(subscription);
  }

  private unsubscribeAllSubscriptions(): void {
    this.subscriptions$.forEach((subscription) => subscription.unsubscribe());
  }
}
