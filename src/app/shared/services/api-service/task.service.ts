import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private urlManager = environment.apiBaseUrlManager;
  private urlUser = environment.apiBaseUrlUser;

  constructor(private httpClient: HttpClient) {
  }

  public createTask(task: Task, courseId: number): Observable<Task> {
    const payload = new FormData();

    payload.append("task", JSON.stringify(task));

    return this.httpClient.post<Task>(`${this.urlManager}/courses/${courseId}/create-task`, payload)
  }

  public deleteTask(id: number | undefined) {
    return this.httpClient.delete(`${this.urlManager}/task/${id}`)
  }

  public getAllTasksForUser(idCourse: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.urlUser}/tasks/${idCourse}`)

  }

  public getAllTasksForUserManager(idCourse: number, email: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.urlManager}/status-tasks-users/${idCourse}/${email}`)
  }

  public changeStatusTask(status: string, idTask: number): Observable<any> {

    return this.httpClient.get(`${this.urlUser}/change-status-task/${idTask}?status=${status}`)
  }

}
