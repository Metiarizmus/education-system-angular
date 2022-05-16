import {Component, OnInit} from '@angular/core';
import {OrgService} from "../../shared/services/org.service";
import {Organization} from "../../shared/models/Organization";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-org',
  templateUrl: './org-page.component.html',
  styleUrls: ['./org-page.component.scss']
})
export class OrgPageComponent implements OnInit {

  orgs!: Organization[];

  constructor(private orgService: OrgService) {
  }

  ngOnInit(): void {

  }

  getOrgs(): void {
    this.orgService.getAllPublicOrg().subscribe(
      (response: Organization[]) => {
        this.orgs = response;
      },
  )
    ;
  }


}
