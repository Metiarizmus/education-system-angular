import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../../models/user";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrlUser;
  userDataBroadcast = new BehaviorSubject<any>('')
  broadcastObservable$ = this.userDataBroadcast.asObservable()

  broadcast(data: any) {
    if (data) {
      this.userDataBroadcast.next(data)
    }
  }

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
  }

  public getUser(): Observable<User> {

    let email = this.localStorage.retrieve('email');
    return this.httpClient.get<User>(`${this.apiServerUrl}/${email}`);
  }

  public enterToPublicOrg(id: number): Observable<any> {
    return this.httpClient.get<User>(`${this.apiServerUrl}/join-public-orgs/${id}`);
  }

}
