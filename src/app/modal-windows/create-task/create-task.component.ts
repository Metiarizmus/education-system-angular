import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrgService} from "../../shared/services/api-service/org.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Task} from "../../shared/models/task";
import {TaskService} from "../../shared/services/api-service/task.service";
import {UserService} from "../../shared/services/api-service/user.service";

@Component({
  selector: 'app-create-org-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  task: Task
  form!: FormGroup;
  @Input() idCourse!: number


  constructor(public activeModal: NgbActiveModal,
              private taskService: TaskService,
              private builder: FormBuilder,
              private toastr: ToastrService,
              private service: UserService) {

    this.task = {
      name: "",
      description: "",
      text: "",
      expirationCountHours: 0
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
        text: new FormControl('', [
          Validators.required,
        ]),
        expirationCountHours: new FormControl('', [
          Validators.required,
        ])
      }
    )
  }

  createTask() {
    const formData = {...this.form?.value}
    this.task.name = formData.name;
    this.task.description = formData.description;
    this.task.text = formData.text;
    this.task.expirationCountHours = formData.expirationCountHours
    this.taskService.createTask(this.task, this.idCourse).subscribe(
      (resp => {
        this.toastr.success("Task was created")
        this.service.broadcast(resp)
      })
    )

  }
}
