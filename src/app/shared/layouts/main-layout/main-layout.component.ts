import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss', '../../../../assets/layout-styles.scss']
})
export class MainLayoutComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService,
              private localStorage: LocalStorageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  public isAuthenticate(): boolean {
    return this.authService.isAuthenticated()
  }

  getUser() {
    this.userService.getUser().subscribe(
      (resp: User) => {
        this.user = resp;
        this.userService.peredaja(resp)
      }, (error: HttpErrorResponse) => {
      }
    )
  }

  logout() {
    this.authService.logout()
  }

}
