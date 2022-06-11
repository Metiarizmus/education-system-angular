import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Organization} from "../../../../shared/models/organization";
import {OrgService} from "../../../../shared/services/api-service/org.service";

@Component({
  selector: 'app-list-org',
  templateUrl: './list-org.component.html',
  styleUrls: ['./list-org.component.scss']
})
export class ListOrgComponent implements OnInit {

  orgs!: Organization[];
  isLoadProfile: boolean = false;
  @Input() listMyOrg: boolean = false
  @Input() isManager: boolean = false

  constructor(private orgService: OrgService) {

  }

  ngOnInit(): void {

    if (!this.listMyOrg && !this.isManager) {
      this.getPublicOrgs('')
    }
    if (this.isManager && !this.listMyOrg) {
      this.managersOrgList()
    }
    if (this.listMyOrg && !this.isManager) {
      this.findMy()
    }

  }

  getPublicOrgs(name: string): void {
    if (name === '') {
      this.orgService.getAllPublicOrg().subscribe(
        (response: Organization[]) => {
          this.isLoadProfile = true
          this.orgs = response;
        },
      )
    } else {
      this.orgService.getAllPublicOrgByName(name).subscribe(
        (response: Organization[]) => {
          this.isLoadProfile = true
          this.orgs = response;
        },
      )
    }
  }

  findMy() {
    this.orgService.getOrgByCreatorId().subscribe(
      (resp: Organization[]) => {
        this.isLoadProfile = true
        this.orgs = resp
      }
    )
  }

  managersOrgList() {
    this.orgService.getOrgForRole("ROLE_MANAGER").subscribe(
      (resp: Organization[]) => {
        this.isLoadProfile = true
        this.orgs = resp
      }
    )
  }


}
