import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {User} from "./shared/models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "./shared/services/api-service/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2"
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

  getUser() {
    this.userService.getUser().subscribe(
      (resp: User) => {
        this.user = resp;
        this.userService.broadcast(resp)
      }, (error: HttpErrorResponse) => {
      }
    )
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login-page'])
  }



}
