import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Organization} from "../../../../shared/models/organization";
import {ActivatedRoute, Params} from "@angular/router";
import {OrgService} from "../../../../shared/services/api-service/org.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../../shared/services/api-service/user.service";
import {User} from "../../../../shared/models/user";
import {RootAdminService} from "../../../../shared/services/api-service/root-admin.service";
import {InviteUser} from "../../../../shared/models/inviteUser";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InviteComponent} from "../../../../modal-windows/invite/invite.component";

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.scss']
})
export class OrgProfileComponent implements OnInit, AfterViewInit {

  org!: Organization
  user!: User

  isLoadProfile: boolean = false
  idOrg: number = -1
  countPeople: number | undefined = 0
  choiceRole: string = ''
  status: boolean = false;


  @Input() createCourse: any

  constructor(private route: ActivatedRoute,
              private orgService: OrgService,
              private toastr: ToastrService,
              private userService: UserService,
              private rootAdminService: RootAdminService,
              private modalService: NgbModal) {
  }

  ngAfterViewInit(): void {
    this.isUserInOrg()
  }

  ngOnInit(): void {

    this.userService.broadcastObservable$.subscribe(data => {
      this.user = data

    })

    this.route.params.subscribe((params: Params) => {
      this.getOrg(params['id'])

    }, error => {
    })



  }

  getOrg(id: number) {
    this.orgService.getOrgById(id).subscribe((response: any) => {
      this.idOrg = id
      this.isLoadProfile = true
      this.org = response
      this.countPeople = this.org.users?.length
    }, error => {
      this.toastr.error('Profile org error')
    })
  }

  enterToOrg() {
    this.userService.enterToPublicOrg(this.idOrg).subscribe(async () => {
      this.toastr.success('You enter to the Organization')
      await new Promise(f => setTimeout(f, 1000));
      window.location.reload();
    }, error => {
      this.toastr.error('Profile org error')
    })
  }

  isUserInOrg(): boolean {

    for (let i = 0; i < this.org.users!.length; i++) {
      if (!(this.org.users) || this.org.users[i].email === this.user.email) {
        return true;
        break
      }
    }
    return false
  }

  isRootAdmin(): boolean {

    if (this.org.creatorId === this.user.id) {
      return true;
    } else
      return false
  }

  leaveFromOrg() {

  }

  roleManager() {
    this.choiceRole = 'ROLE_MANAGER'
  }

  roleAdmin() {
    this.choiceRole = 'ROLE_ADMIN'
  }

  deleteOrg() {

  }

  sendInvite = (invite: InviteUser, role: string) => {

    invite.role = role

    this.rootAdminService.sendInvite(invite).subscribe(data => {
      if (data) {
        this.toastr.success(data)
      }
    })

  }

  openModal() {
    const modalRef = this.modalService.open(InviteComponent);
    modalRef.componentInstance.roleName = this.choiceRole;
    modalRef.componentInstance.modalInvite = this.sendInvite;

  }

  clickEvent() {
    this.status = !this.status;
  }
}
