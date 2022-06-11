import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {Observable} from "rxjs";
import {Course} from "../../models/course";
import {Organization} from "../../models/organization";
import {InviteUser} from "../../models/inviteUser";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private urlUser = environment.apiBaseUrlUser;
  private urlManager = environment.apiBaseUrlManager;

  constructor(private httpClient: HttpClient) {
  }

  public getUsersCourses(): Observable<Course> {
    return this.httpClient.get<Course>(`${this.urlUser}/courses`);
  }

  public createCourse(course: Course, idOrg: number): Observable<Course> {
    const payload = new FormData();

    payload.append("course", JSON.stringify(course));

    return this.httpClient.post<Course>(`${this.urlManager}/create-course/${idOrg}`, payload)
  }

  public getAllCourse(role: string): Observable<Course[]> {

    let url = ""

    if (role === "manager") {
      url = this.urlManager
    }
    if (role === "user") {
      url = this.urlUser

    }

    return this.httpClient.get<Course[]>(`${url}/courses`)
  }

  public getCourseById(id: number, role:string): Observable<Course> {

    let url = ""

    if (role === "manager") {
      url = this.urlManager
    }
    if (role === "user") {
      url = this.urlUser

    }

    return this.httpClient.get<Course>(`${url}/courses/${id}`)
  }

  public deleteCourse(id: number | undefined) {
    return this.httpClient.delete(`${this.urlManager}/delete-course/${id}`)
  }

  public updateCourse(course: Course): Observable<Course> {
    return this.httpClient.put<Course>(`${this.urlManager}/update-course`, course)
  }

  public inviteUserToCourse(idCourse: number | undefined, user: InviteUser): Observable<any> {
    return this.httpClient.post<any>(`${this.urlManager}/invite-to-course/${idCourse}`, user)
  }

  public acceptCourse(token: string): Observable<any> {
    return this.httpClient.get<any>(`${this.urlUser}/accept-course`, {params: {"confirmToken": token}})

  }

}
