import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  private stateSource = new  BehaviorSubject(true);

  currentStateManu = this.stateSource.asObservable();

  constructor() {
  }

  changeMenuState(menuState: boolean) {
    this.stateSource.next(menuState)
  }
}
