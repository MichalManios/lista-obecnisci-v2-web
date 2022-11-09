import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import {User} from "../../security/model/user.class";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user = new User();

  isMenuVisible = true;

  title = 'Lista obecności';

  isLoggedIn = false;

  userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.user.authStatus = 'AUTH';
      this.user.name = this.userProfile.firstName || "";
      window.sessionStorage.setItem("userdetails",JSON.stringify(this.user));

    }
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    let redirectURI: string = "http://localhost:4200";
    this.keycloak.logout(redirectURI);
  }
}
