import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MenuStateService } from '../shared/menu-state.service';
import { Subscription, tap } from "rxjs";

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit, OnDestroy {

  isMenuOpen!: boolean;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'buttons'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscriptions$: Subscription[] = [];

  constructor(private menuStateService: MenuStateService) {
  }

  ngOnInit(): void {
    this.getCurrentStateMenu();
  }

  ngOnDestroy(): void {
    this.unsubscribeAllSubscriptions();
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  {position: 21, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 22, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 23, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 24, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 25, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 26, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
