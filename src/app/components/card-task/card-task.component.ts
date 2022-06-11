import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../shared/models/task";
import Swal from "sweetalert2";
import {TaskService} from "../../shared/services/api-service/task.service";
import {ProgressTaskEnum} from "../../shared/models/ProgressTaskEnum";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss']
})
export class CardTaskComponent implements OnInit {

  @Input() task!: Task
  @Output() updateEmitter = new EventEmitter<any>()
  status!:any
  userRole!: string


  constructor(private taskService: TaskService,
              private storage: LocalStorageService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.status = this.task.progressTasks[0].progressTaskEnum
    this.userRole = this.storage.retrieve('roles')[0]
  }

  confirmBox() {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.deleteTask(this.task.id)

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

  deleteTask(id: number | undefined) {
    this.taskService.deleteTask(id).subscribe(
      (idResponse) => {

        this.updateEmitter.emit(idResponse)

      }, error => {

      }
    )
  }


  changeStatus(e: string) {
    this.taskService.changeStatusTask(e, this.task.id!).subscribe(
      (resp) => {
        this.status = e
        // @ts-ignore
        this.task.progressTasks?.progressTaskEnum = e
        console.log(resp)
      }
    )
  }
}
