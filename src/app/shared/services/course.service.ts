import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {Observable} from "rxjs";
import {Course} from "../models/course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiServerUrl = environment.apiBaseUrlUser;


  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
  }

  public getUsersCourses(): Observable<Course> {
    return this.httpClient.get<Course>(`${this.apiServerUrl}/courses`);
  }
}
