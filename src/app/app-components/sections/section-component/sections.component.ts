import { Component, OnInit, ViewChild } from '@angular/core';
import { Section } from '../model/section.interface';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subscription, tap } from 'rxjs';
import { MenuStateService } from '../../../shared/menu-state/menu-state.service';
import { MatDialog } from '@angular/material/dialog';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  dataSource!: Observable<Section[]>;

  isMenuOpen!: boolean;

  displayedColumns: string[] = ['lp', 'name', 'buttons'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscriptions$: Subscription = new Subscription();

  constructor(private menuStateService: MenuStateService,
              public dialog: MatDialog,
              private sectionService: SectionService) {
  }

  ngOnInit(): void {
    this.getCurrentStateMenu();
    this.dataSource = this.getAllSections();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  private getAllSections(): Observable<Section[]> {
    return this.sectionService.getAllSections();
  }


  private getCurrentStateMenu(): void {
    const subscription$ = this.menuStateService.currentStateManu
      .pipe(tap(state => this.isMenuOpen = state)).subscribe();

    this.subscriptions$.add(subscription$);
  }
}
