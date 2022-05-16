import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/user";
import {UserService} from "../../shared/services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Course} from "../../shared/models/course";
import {CourseService} from "../../shared/services/course.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

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


  // rol() {
  //
  //   if (JSON.stringify(this.user.roles.nameRoles==='ROLE_USER')){
  //     console.log("da")
  //   }
  //   else console.log('NET')
  // }

}
