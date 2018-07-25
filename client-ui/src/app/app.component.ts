// app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './auth-feature/auth.service';
import { LaunchDarklyService } from './app-feature/launchdarkly.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" routerLink="/dashboard">Daily Deals</a>
        </div>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/deals" routerLinkActive="active">Deals</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/special" *ngIf="authService.isLoggedIn" routerLinkActive="active">Private Deals</a>
            </li>
            <li class="nav-item" *ngIf="show">
              <a class="nav-link" routerLink="/newfeature">New Feature</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="nav-item">
              <a class="nav-link" *ngIf="!authService.isLoggedIn" (click)="authService.login()">Log In</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" (click)="authService.logout()" *ngIf="authService.isLoggedIn">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-sm-12">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `.navbar-right { margin-right: 0px !important}`
  ]
})

export class AppComponent {
  title = 'Daily Deals';
  _subscription: any;
  show: boolean;

  constructor(
    public authService: AuthService,
    private ld: LaunchDarklyService) {

    this.show = ld.flags['daily-deals-feature'];
    this._subscription = ld.flagChange.subscribe((flags) => {
      this.show = flags['daily-deals-feature'].current;
    });
  }
}
