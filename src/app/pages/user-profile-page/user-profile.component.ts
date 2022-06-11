import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../shared/models/user";
import {UserService} from "../../shared/services/api-service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Course} from "../../shared/models/course";
import {CourseService} from "../../shared/services/api-service/course.service";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile..component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user!: User
  courses!: Course
  isLoadProfile: boolean = false

  constructor(private userService: UserService,
              private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.userService.broadcastObservable$.subscribe(data => {
      this.user = data
      this.isLoadProfile = true
    })

    this.getCourses()
  }

  getCourses() {
    this.courseService.getUsersCourses().subscribe(
      (resp: Course) => {
        this.courses = resp;
      }, (error: HttpErrorResponse) => {

      }
    )
  }

  ngOnDestroy(): void {
    this.userService.userDataBroadcast.unsubscribe()
  }


}
