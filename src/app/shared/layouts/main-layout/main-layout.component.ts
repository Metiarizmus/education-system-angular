import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/api-service/user.service";
import {LocalStorageService} from "ngx-webstorage";
import {AuthService} from "../../services/api-service/auth.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss', '../../../../assets/layout-styles.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  user!: User;
  role!: string
  constructor(private userService: UserService,
              private localStorage: LocalStorageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userService.broadcastObservable$.subscribe(data => {
      this.user = data
      // @ts-ignore
      this.role = this.user.roles[0]?.nameRoles
    })
  }

  public isAuthenticate(): boolean {
    return this.authService.isAuthenticated()
  }

  logout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.userService.userDataBroadcast.unsubscribe()
  }


}
