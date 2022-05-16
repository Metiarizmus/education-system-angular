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
import {AuthService} from "./shared/services/auth.service";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloPageComponent,
    RegistrationComponent,
    LoginComponent,
    ErrorPageComponent,
    MainPageComponent,
    OrgPageComponent,
    ProfilePageComponent,
    SpinnerComponent,
    AuthLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      preventDuplicates: true
    })
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
