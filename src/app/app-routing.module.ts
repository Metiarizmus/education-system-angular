import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/auth/login-page/login.component";
import {RegistrationComponent} from "./pages/auth/registration-page/registration.component";
import {HelloPageComponent} from "./pages/hello-page/hello-page.component";
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {OrgPageComponent} from "./pages/org-page/org-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";

const routes: Routes = [

  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/hello', pathMatch: 'full'},
      {path: 'hello', component: HelloPageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: RegistrationComponent},
    ]
  },

  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/main', pathMatch: 'full'},
      {path: 'hello', component: HelloPageComponent},
      {path: 'main', component: MainPageComponent},
      {path: 'profile', component: ProfilePageComponent},
      {path: 'orgs', component: OrgPageComponent},

    ]
  },

  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


//
// import {Injectable} from '@angular/core';
// import {CanActivate, Router} from "@angular/router";
// import {lastValueFrom} from "rxjs";
// import {JwtHelperService} from '@auth0/angular-jwt';
// import {environment} from "../../environments/environment";
// import {HttpClient} from "@angular/common/http";
// import {NotificationService} from "../shared/services/notification.service";
// import {AuthService} from "../shared/services/auth.service";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanActivate{
//
//   public jwtHelper: JwtHelperService = new JwtHelperService();
//
//   constructor(private router: Router,
//               private http: HttpClient,
//               private notification: NotificationService,
//               private auth: AuthService) {
//   }
//
//   canActivate() :boolean {
//
//     if (!this.auth.isAuthenticated()) {
//       this.router.navigate(["/login"])
//       return false;
//     }
//
//     const token = localStorage.getItem("accessToken");
//     const isRefreshSuccess = this.refreshingTokens(token);
//     if (!isRefreshSuccess) {
//       this.router.navigate(["/login"]);
//       return false;
//     }
//
//     return true;
//   }
//
//   private async refreshingTokens(token: string | null): Promise<boolean> {
//     const refreshToken: string | null = localStorage.getItem("refreshToken");
//
//     if (!token || !refreshToken) {
//       return false;
//     }
//
//     const tokenModel = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
//
//     let isRefreshSuccess: boolean;
//     try {
//
//       const response = await lastValueFrom(this.http.post(environment.apiBaseUrlAuth + "/refreshtoken", tokenModel));
//       const newToken = (<any>response).accessToken;
//       const newRefreshToken = (<any>response).refreshToken;
//       localStorage.setItem("accessToken", newToken);
//       localStorage.setItem("refreshToken", newRefreshToken);
//       this.notification.showSuccess("Token renewed successfully", "Success")
//       isRefreshSuccess = true;
//     }
//     catch (ex) {
//       isRefreshSuccess = false;
//     }
//     return isRefreshSuccess;
//   }
//
//
// }
