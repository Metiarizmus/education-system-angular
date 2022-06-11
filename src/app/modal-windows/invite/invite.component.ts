import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InviteUser} from "../../shared/models/inviteUser";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  form!: FormGroup
  @Input() roleName!: string
  @Input() modalInvite!: any

  invite: InviteUser = {email: '', role: this.roleName, typeWayInvited: '', expirationDateCount: 0}

  constructor(private builder: FormBuilder,
              public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({

      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),

      typeWayInvited: new FormControl('', [
        Validators.required
      ]),

      expirationDateCount: new FormControl('', [
        Validators.required
      ])
    });
  }

}
