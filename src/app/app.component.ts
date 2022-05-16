import {Component, Input, NgModule, OnInit} from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {User} from "./shared/models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "./shared/services/user.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {filter, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService,
              private localStorage: LocalStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  public isAuthenticate(): boolean {
    let email = this.localStorage.retrieve('email');
    if (email != null) {
      return true;
    } else
      return false;
  }

  getUser() {
    this.userService.getUser().subscribe(
      (resp: User) => {
        this.user = resp;

      }, (error: HttpErrorResponse) => {
      }
    )
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login-page'])
  }
}
