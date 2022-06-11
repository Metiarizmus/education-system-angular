import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Course} from "../../shared/models/course";
import {CourseService} from "../../shared/services/api-service/course.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  @Input() course!: Course
  @Input() title!: string

  constructor(public activeModal: NgbActiveModal,
              private courseService: CourseService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  updateCourse(value: Course) {
    this.course.name = value.name
    this.course.description = value.description
    this.course.plan = value.plan

    this.courseService.updateCourse(this.course).subscribe(
      (resp) => {
        this.course = resp
        this.toastr.success("Course was edit")
      }
    )
  }
}
