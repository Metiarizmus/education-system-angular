import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Course} from "../../shared/models/course";
import {CourseService} from "../../shared/services/api-service/course.service";
import {UserService} from "../../shared/services/api-service/user.service";

@Component({
  selector: 'app-managers-page',
  templateUrl: './managers-page.component.html',
  styleUrls: ['./managers-page.component.scss']
})
export class ManagersPageComponent implements OnInit {

  isManagersList: boolean = true
  courses!: Course[]
  isLoadCourses: boolean = false


  constructor(private router: Router,
              private courseService: CourseService,
              private service: UserService) {
  }

  ngOnInit(): void {
    this.service.broadcastObservable$
      .subscribe((course: Course) => {
        this.courses.push(course)
      })

    this.getAllCourse()
  }

  getAllCourse() {
    this.courseService.getAllCourse("manager").subscribe(
      (resp) => {
        this.courses = resp
        this.isLoadCourses = true
      }
    )
  }

  updateListCourses(idRem: number) {
    this.courses = this.courses.filter(el => el.id !== idRem)
  }
}
