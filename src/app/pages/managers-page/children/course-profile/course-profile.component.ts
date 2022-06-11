import {Component, OnInit} from '@angular/core';
import {Course} from "../../../../shared/models/course";
import {CourseService} from "../../../../shared/services/api-service/course.service";
import {ActivatedRoute, Params} from "@angular/router";
import {CreateTaskComponent} from "../../../../modal-windows/create-task/create-task.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Task} from "../../../../shared/models/task";
import {UserService} from "../../../../shared/services/api-service/user.service";
import {InviteComponent} from "../../../../modal-windows/invite/invite.component";
import {InviteUser} from "../../../../shared/models/inviteUser";
import {ToastrService} from "ngx-toastr";
import {TaskService} from "../../../../shared/services/api-service/task.service";

@Component({
  selector: 'app-course-profile',
  templateUrl: './course-profile.component.html',
  styleUrls: ['./course-profile.component.scss']
})
export class CourseProfileComponent implements OnInit {

  course!: Course
  isLoadProfile: boolean = false
  idCourse: number = -1
  status: boolean = false;
  tasks!:Task[]

  clickEvent() {
    this.status = !this.status;
  }

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private service: UserService,
              private toastr: ToastrService,
              private ts:TaskService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.getCourse(params['id'])
      this.idCourse = params['id']
    }, error => {
    })

    this.service.broadcastObservable$
      .subscribe((task: Task) => {
        this.course.tasks?.push(task)
      })

  }

  getCourse(id: number) {
    this.courseService.getCourseById(id, "manager").subscribe(
      (resp) => {
        this.isLoadProfile = true
        this.course = resp
      }
    )
  }

  openModalTask() {
    const modalRef = this.modalService.open(CreateTaskComponent);
    modalRef.componentInstance.idCourse = this.idCourse
  }

  updateListTasks(idRem: number) {
    this.course.tasks = this.course.tasks?.filter(el => el.id !== idRem)
  }

  inviteUser() {
    const modalRef = this.modalService.open(InviteComponent);
    modalRef.componentInstance.roleName = "ROLE_USER";
    modalRef.componentInstance.modalInvite = this.sendInviteUser;
  }

  sendInviteUser = (invite: InviteUser, role: string) => {

    this.courseService.inviteUserToCourse(this.course.id, invite).subscribe(data => {
      if (data ) {
        this.toastr.success(data)
      }
    })

  }

  mySelectHandler($event: any) {
    this.getTasksForUser(this.idCourse, $event)
  }

  getTasksForUser(idCourse: number, email: string) {
    this.ts.getAllTasksForUserManager(idCourse, email).subscribe(
      (resp) => {
        this.tasks = resp
      }
    )
  }
}
