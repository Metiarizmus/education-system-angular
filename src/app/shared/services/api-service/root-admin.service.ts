import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {InviteUser} from "../../models/inviteUser";

@Injectable({
  providedIn: 'root'
})
export class RootAdminService {
  private apiServerUrl = environment.apiBaseUrlRootAdmin;

  constructor(private httpClient: HttpClient) {
  }

  public sendInvite(formInvite: InviteUser):Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/invite`, formInvite, {responseType: 'text'})
  }
}
