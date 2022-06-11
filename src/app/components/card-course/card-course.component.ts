import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from "../../shared/models/course";
import Swal from "sweetalert2";
import {CourseService} from "../../shared/services/api-service/course.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditCourseComponent} from "../../modal-windows/edit-course/edit-course.component";

@Component({
  selector: 'app-card-course',
  templateUrl: './card-course.component.html',
  styleUrls: ['./card-course.component.scss']
})
export class CardCourseComponent implements OnInit {

  @Input() course!: Course
  updateCourse!: Course
  @Output() updateEmitter = new EventEmitter<any>()

  constructor(private courseService: CourseService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

      this.deleteCourse(this.course.id)

        Swal.fire(
          'Deleted!',
          'Your course has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your course is safe :)',
          'error'
        )
      }
    })
  }

  deleteCourse(id: number | undefined) {
    this.courseService.deleteCourse(id).subscribe(
      (idResponse) => {

        this.updateEmitter.emit(idResponse)

      },error => {

      }
    )
  }

  editCourse() {
    const modalRef = this.modalService.open(EditCourseComponent);
    this.updateCourse = this.course

    modalRef.componentInstance.course = this.updateCourse
    modalRef.componentInstance.title = "Edit course"
  }

}
