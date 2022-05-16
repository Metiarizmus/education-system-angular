import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestUser} from "../../../payload/request/login-request.user";
import {AuthService} from "../../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../../shared/services/token-storage.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  loginRequestUser: LoginRequestUser
  private isError?: boolean;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              ) {
    this.loginRequestUser = {
      email: '',
      password: ''
    }
  }

  ngOnInit() {
    this.form = this.builder.group({

      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),

      password: new FormControl('', [
        Validators.required, Validators.minLength(4)
      ])
    });

  }

  login() {
    const formData = {...this.form.value}
    this.loginRequestUser.email = formData.email
    this.loginRequestUser.password = formData.password
    this.authService.login(this.loginRequestUser).subscribe(data => {
      if (data) {
        this.toastr.success('Login Successful')
        this.router.navigateByUrl('/main')
        this.isError = false
      }else {
        this.isError = true
      }
    })
  }

}
