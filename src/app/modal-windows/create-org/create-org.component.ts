import {Component, OnInit} from '@angular/core';
import {SignupRequestUser} from "../../payload/request/signup-request.user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/api-service/auth.service";
import {NotificationService} from "../../shared/services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormValidators} from "../../validator/form.validators";
import {Organization} from "../../shared/models/organization";
import {OrgService} from "../../shared/services/api-service/org.service";

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss']
})
export class CreateOrgComponent implements OnInit {

  org: Organization;
  form!: FormGroup;

  constructor(private builder: FormBuilder,
              private orgService: OrgService,
              private router: Router,
              private toastr: ToastrService
  ) {
    this.org = {
      id: 0,
      avatar: null,
      name: '',
      description: '',
      status: '',
    }
  }


  ngOnInit() {
    this.form = this.builder.group({
        name: new FormControl('', [
          Validators.required
        ]),
        avatar: new FormControl('', [Validators.required]),
        description: new FormControl('', [
          Validators.required
        ]),
        statusOrg: new FormControl('', [
          Validators.required,
        ]),
      }
    )

  }

  selectedFile = null;

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  createOrg() {
    const formData = {...this.form?.value}
    this.org.name = formData.name;
    this.org.description = formData.description;
    this.org.status = formData.statusOrg;

    this.orgService.createOrg(this.org, this.selectedFile).subscribe(() => {
      this.form.reset()
      this.toastr.success('Create org successful')

      }, () => {
        this.toastr.error('Registration Failed! Please try again')
      }
    )


  }

}
