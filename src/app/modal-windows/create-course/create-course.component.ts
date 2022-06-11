import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from "../../shared/models/course";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CourseService} from "../../shared/services/api-service/course.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../shared/services/api-service/user.service";

@Component({
  selector: 'app-create-org-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  course!: Course
  form!: FormGroup
  @Input() title!: string
  @Input() orgId!: number

  constructor(private builder: FormBuilder,
              private courseService: CourseService,
              public activeModal: NgbActiveModal,
              private toastr: ToastrService,
              private service: UserService) {

    this.course = {
      name: '',
      plan: '',
      description: ''
    }
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      plan: new FormControl('', [
        Validators.required
      ])
    })
  }

  createCourse() {

    this.getDataForm()
    this.form.reset()
    this.courseService.createCourse(this.course, this.orgId).subscribe(
       (resp) => {
        this.toastr.success("Course was created")
        this.service.broadcast(resp)
      }
    )

  }

  getDataForm() {
    const formData = {...this.form?.value}
    this.course.name = formData.name;
    this.course.description = formData.description;
    this.course.plan = formData.plan;
  }

}
