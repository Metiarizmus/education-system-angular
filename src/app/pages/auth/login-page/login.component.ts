import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestUser} from "../../../payload/request/login-request.user";
import {AuthService} from "../../../shared/services/api-service/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {CourseService} from "../../../shared/services/api-service/course.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  loginRequestUser: LoginRequestUser
  isError?: boolean;
  notCorrectEmailOrPassword: boolean = false
  token: string = ""


  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private courseService: CourseService
  ) {
    this.loginRequestUser = {
      email: '',
      password: ''
    }
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      if (params['confirmToken'] != undefined) {
        this.token = params['confirmToken']
        alert(this.token)
        this.acceptCourse()
      }
    })

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

          this.router.navigate(['/main'])


        this.isError = false
      } else {
        this.isError = true
      }
    }, (error => {
      this.notCorrectEmailOrPassword = true
    }))
  }

  acceptCourse() {
    this.courseService.acceptCourse(this.token).subscribe(
      () => {
      this.toastr.success("Enter to your acc")
      },error => alert("smth went wrong:(")
    )
  }

}
