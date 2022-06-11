import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidators} from "../../../validator/form.validators";
import {SignupRequestUser} from "../../../payload/request/signup-request.user";
import {AuthService} from "../../../shared/services/api-service/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NotificationService} from "../../../shared/services/notification.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],

})
export class RegistrationComponent implements OnInit {

  userRequest: SignupRequestUser;
  form!: FormGroup
  token: string = ""
  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private alertService: NotificationService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService
  ) {

    this.userRequest = {
      avatar: null,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: ''
    }
  }


  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      if (params['confirmToken'] != undefined){
        this.token = params['confirmToken']
      }
    })


    this.form = this.builder.group({
        firstName: new FormControl('', [
          Validators.required
        ]),
        avatar: new FormControl([]),
        lastName: new FormControl('', [
          Validators.required
        ]),
        email: new FormControl('', [
          Validators.email,
          //FormValidators.uniqEmail as AsyncValidatorFn
        ]),
        phoneNumber: new FormControl(null, [
          Validators.pattern("^[0-9]{10,12}$")
        ]),
        password: new FormControl('', [
          Validators.required, Validators.minLength(4)
        ]),
        confirmPassword: new FormControl('', [
          Validators.required])
      }, {
        validators: FormValidators.mustMatch('password', 'confirmPassword')
      }
    )

  }


  selectedFile = null;

  onSelectFile(event : any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  signup() {

    this.getDataForm()

      this.authService.signup(this.userRequest, this.selectedFile, this.token).subscribe(async (data) => {
          this.toastr.success(data)
          await new Promise(f => setTimeout(f, 1500));

          await this.router.navigate(['/login'],
            {queryParams: {registered: 'true'}})
        }, () => {
          this.toastr.error('Registration Failed! Please try again')
        }
      )

  }


  getDataForm() {
    const formData = {...this.form?.value}
    this.userRequest.firstName = formData.firstName;
    this.userRequest.lastName = formData.lastName;
    if (this.token.length != 0) {
      this.userRequest.email = formData.email;
    }
    this.userRequest.phoneNumber = formData.phoneNumber;
    this.userRequest.password = formData.password;
  }


}
