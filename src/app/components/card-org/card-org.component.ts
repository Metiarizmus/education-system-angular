import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Organization} from "../../shared/models/organization";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateCourseComponent} from "../../modal-windows/create-course/create-course.component";

@Component({
  selector: 'app-card-org',
  templateUrl: './card-org.component.html',
  styleUrls: ['./card-org.component.scss']
})
export class CardOrgComponent implements OnInit {

  @Input() org!: Organization
  @Input() isManager: boolean = false

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }


  openCreateCourse(orgId: number) {
    const modalRef = this.modalService.open(CreateCourseComponent)
    modalRef.componentInstance.title = 'Create course'
    modalRef.componentInstance.orgId = orgId
  }
}
