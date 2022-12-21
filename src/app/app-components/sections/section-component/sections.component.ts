import { Component, OnInit, ViewChild } from '@angular/core';
import { Section } from '../model/section.interface';
import { MatPaginator } from '@angular/material/paginator';
import { iif, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { MenuStateService } from '../../../shared/menu-state/menu-state.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SectionService } from '../section.service';
import { AddSectionsComponent } from '../add-sections/add-sections.component';
import { DialogMessageComponent } from '../../../shared/dialog-message/dialog-message/dialog-message.component';
import { DialogMessageEnum } from '../../../shared/dialog-message/dialog-message/dialog-message.enum';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  dataSource!: Section[];

  isMenuOpen!: boolean;

  displayedColumns: string[] = ['lp', 'name', 'buttons'];

  displayOrder = ['name'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscriptions$: Subscription = new Subscription();

  constructor(private menuStateService: MenuStateService,
              public dialog: MatDialog,
              private sectionService: SectionService) {
  }

  ngOnInit(): void {
    this.getCurrentStateMenu();
    this.getAllSections();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  addSection(): void {
    const dialogRef = this.getAddSectionComponent();

    const subscription$ = dialogRef.afterClosed().pipe(
      tap(result => this.dataSource = result != null ? [...this.dataSource, result] : this.dataSource)).subscribe();

    this.subscriptions$.add(subscription$);
  }

  updateSection(section: Section): void {
    const dialogRef = this.getAddSectionComponent();

    dialogRef.componentInstance.section = section;
    const subscription$ = dialogRef.afterClosed().pipe(
      tap(section => this.dataSource = this.getUpdatedDataSource(section))).subscribe();

    this.subscriptions$.add(subscription$);
  }

  deleteSection(sectionId: number): void {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.messageText = 'Czy na pewno chcesz usunąć dział?';
    const subscription$ = dialogRef.afterClosed().pipe(
      switchMap(dialogMessage =>  iif(() => dialogMessage === DialogMessageEnum.YES,
        this.delete(sectionId),
        of(null)))
    )
      .subscribe();

    this.subscriptions$.add(subscription$);
  }

  private delete(sectionId: number): Observable<Section> {
    return this.sectionService.deleteSection(sectionId).pipe(
      tap(sectionDeleted => this.dataSource = this.dataSource.filter(section => section.id !== sectionDeleted.id)));
  }

  private getAllSections(): void {
    this.sectionService.getAllSections().pipe(tap(sections => this.dataSource = [...sections])).subscribe();
  }

  private getCurrentStateMenu(): void {
    const subscription$ = this.menuStateService.currentStateManu
      .pipe(tap(state => this.isMenuOpen = state)).subscribe();

    this.subscriptions$.add(subscription$);
  }

  private getAddSectionComponent(): MatDialogRef<AddSectionsComponent, any> {
    return this.dialog.open(AddSectionsComponent, {
      disableClose: true,
      width: '540px',
      data: {},
    });
  }

  private getUpdatedDataSource(section: Section): Section[] {
    this.dataSource[this.dataSource.findIndex(({ id }) => id === section.id)] = section;
    return [...this.dataSource];
  }
}
