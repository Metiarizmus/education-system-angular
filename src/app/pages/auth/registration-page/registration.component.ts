import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidators} from "../../../validator/form.validators";
import {SignupRequestUser} from "../../../payload/request/signup-request.user";
import {AuthService} from "../../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
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
    this.form = this.builder.group({
        firstName: new FormControl('', [
          Validators.required
        ]),
        avatar: new FormControl([]),
        lastName: new FormControl('', [
          Validators.required
        ]),
        email: new FormControl('', [
          Validators.required,
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
      console.log(this.selectedFile);
    }
  }

  signup() {
    const formData = {...this.form?.value}
    this.userRequest.firstName = formData.firstName;
    this.userRequest.lastName = formData.lastName;
    this.userRequest.email = formData.email;
    this.userRequest.phoneNumber = formData.phoneNumber;
    this.userRequest.password = formData.password;


    this.authService.signup(this.userRequest, this.selectedFile).subscribe(() => {
        this.router.navigate(['/login-page'],
          {queryParams: {registered: 'true'}})
      }, () => {
        this.toastr.error('Registration Failed! Please try again')
      }
    )

  }


}
