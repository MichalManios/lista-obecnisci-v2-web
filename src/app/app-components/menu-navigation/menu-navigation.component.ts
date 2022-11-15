import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuStateService } from '../../shared/menu-state.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.css']
})
export class MenuNavigationComponent implements OnInit {

  url: string | undefined;

  opened!: boolean;

  @ViewChild('sidenav') private sideNavigation!: MatSidenav;

  constructor(private router: Router,
              private menuStateService: MenuStateService) { }

  ngOnInit(): void {
    this.getCurrentUrl();
  }

  getCurrentUrl(): void {
    this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) this.url = data.url.split('/').pop();
    });
  }

  toggleMenu() {
    this.sideNavigation.toggle();
    this.setCurrentMenuState();
  }

  private setCurrentMenuState() {
    this.menuStateService.changeMenuState(this.opened);
  }
}
