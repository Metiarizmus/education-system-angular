import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/auth/login-page/login.component";
import {RegistrationComponent} from "./pages/auth/registration-page/registration.component";
import {HelloPageComponent} from "./pages/hello-page/hello-page.component";
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {OrgPageComponent} from "./pages/org-page/org-page.component";
import {UserProfileComponent} from "./pages/user-profile-page/user-profile.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {AuthGuardService} from "./guards/auth-guard.service";
import {OrgProfileComponent} from "./pages/org-page/children/org-profile/org-profile.component";
import {ManagersPageComponent} from "./pages/managers-page/managers-page.component";
import {CreateCourseComponent} from "./modal-windows/create-course/create-course.component";
import {CourseProfileComponent} from "./pages/managers-page/children/course-profile/course-profile.component";

const routes: Routes = [
//http://localhost:4200/api/users/accept-course/d7e51f15-13f4-4e75-8082-1e3ed3c2154f
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/hello', pathMatch: 'full'},
      {path: 'hello', component: HelloPageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: RegistrationComponent},
      {path: 'api/auth/signup/invite/:confirmToken', component: RegistrationComponent},
      {path:'api/users/accept-course/:confirmToken', component: LoginComponent}
    ]
  },

  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/main', pathMatch: 'full'},
      {path: 'hello', component: HelloPageComponent},
      {path: 'main', component: MainPageComponent},
      {path: 'profile', component: UserProfileComponent},
      {path: 'orgs', component: OrgPageComponent},
      {path: 'org-profile/:id', component: OrgProfileComponent},
      {path: 'managers', component: ManagersPageComponent, children:[
          {path: '', component: CreateCourseComponent},
        ]},
      {path:'course-profile/:id', component: CourseProfileComponent},
    ],canActivate:[AuthGuardService]
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



