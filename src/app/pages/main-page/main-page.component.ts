import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CourseService} from "../../shared/services/api-service/course.service";
import {Course} from "../../shared/models/course";
import {TaskService} from "../../shared/services/api-service/task.service";
import {Task} from "../../shared/models/task";

@Component({
  selector: 'app-home',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, AfterViewInit {

  courses!: Course[]
  tasks!: Task[]

  public sel: any = "ALL"

  constructor(private courseService: CourseService,
              private ts: TaskService) {
  }

  ngOnInit(): void {
    this.getCourses()
  }

  ngAfterViewInit(): void{
    this.courseService.getCourseById(this.courses[0].id!, "user").subscribe(
      (resp) => {
        this.getTasksForUser(resp.id!)
      }
    )
  }

  getCourses() {
    this.courseService.getAllCourse("user").subscribe(
      (resp) => {
        this.courses = resp
      }
    )
  }

  mySelectHandler($event: any) {
    if ($event === "") {
    } else {
      this.courseService.getCourseById($event, "user").subscribe(
        (resp) => {
          this.getTasksForUser(resp.id!)
        }
      )
    }

  }

  getTasksForUser(id: number) {
    this.ts.getAllTasksForUser(id).subscribe(
      (resp) => {
        this.tasks = resp
      }
    )
  }


}
