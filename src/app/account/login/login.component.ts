import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidators} from "../../validator/form.validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  form: FormGroup

  constructor(private builder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.builder.group({

      email: new FormControl('', [
        Validators.required,
        Validators.email,
        //FormValidators.uniqEmail as AsyncValidatorFn
      ]),

      password: new FormControl('', [
        Validators.required, Validators.minLength(4)
      ])
    })

  }

  submit() {
    console.log('Form submitted ', this.form)
    const formData = {...this.form.value}
    console.log('form data :: ', formData)
  }

}
