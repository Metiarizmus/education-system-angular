import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HelloPageComponent} from './pages/hello-page/hello-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegistrationComponent} from "./pages/auth/registration-page/registration.component";
import {LoginComponent} from "./pages/auth/login-page/login.component";
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from 'ngx-webstorage';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { OrgPageComponent } from './pages/org-page/org-page.component';
import {AuthService} from "./shared/services/api-service/auth.service";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import { UserProfileComponent } from './pages/user-profile-page/user-profile.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { CardOrgComponent } from './components/card-org/card-org.component';
import { ListOrgComponent } from './pages/org-page/children/list-org/list-org.component';
import { CreateOrgComponent } from './modal-windows/create-org/create-org.component';
import { OrgProfileComponent } from './pages/org-page/children/org-profile/org-profile.component';
import { InviteComponent } from './modal-windows/invite/invite.component';
import { ManagersPageComponent } from './pages/managers-page/managers-page.component';
import {CreateCourseComponent} from "./modal-windows/create-course/create-course.component";
import { CourseProfileComponent } from './pages/managers-page/children/course-profile/course-profile.component';
import { CardCourseComponent } from './components/card-course/card-course.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackArrowComponent } from './components/back-arrow/back-arrow.component';
import { CreateTaskComponent } from './modal-windows/create-task/create-task.component';
import { CardTaskComponent } from './components/card-task/card-task.component';
import { EditCourseComponent } from './modal-windows/edit-course/edit-course.component';
import { StatusFilterPipe } from './pipes/status-filter.pipe';
import { StatusSortPipe } from './pipes/status-sort.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HelloPageComponent,
        RegistrationComponent,
        LoginComponent,
        ErrorPageComponent,
        MainPageComponent,
        OrgPageComponent,
        UserProfileComponent,
        SpinnerComponent,
        AuthLayoutComponent,
        MainLayoutComponent,
        CardOrgComponent,
        ListOrgComponent,
        CreateOrgComponent,
        OrgProfileComponent,
        InviteComponent,
        ManagersPageComponent,
        CreateCourseComponent,
        CourseProfileComponent,
        CardCourseComponent,
        BackArrowComponent,
        CreateTaskComponent,
        CardTaskComponent,
        EditCourseComponent,
        StatusFilterPipe,
        StatusSortPipe
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      preventDuplicates: true
    })
  ],
  entryComponents:[
    CreateCourseComponent,
    InviteComponent,
    CreateTaskComponent,
    EditCourseComponent
  ],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
