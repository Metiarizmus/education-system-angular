import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidators} from "../../validator/form.validators";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],

})
export class RegistrationComponent implements OnInit {

  // @ts-ignore
  form: FormGroup

  constructor(private builder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.builder.group({
        firstName: new FormControl('', [
          Validators.required
        ]),
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
        validators: FormValidators.mustMatch('password','confirmPassword')
      }
    )

  }


  submit() {
    console.log('Form submitted ', this.form)
    const formData = {...this.form.value}
    console.log('form data :: ', formData)
  }
}
