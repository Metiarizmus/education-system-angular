import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Organization} from "../models/Organization";

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private apiServerUrl = environment.apiBaseUrlOrg;

  constructor(private httpClient: HttpClient) {
  }

  public getAllPublicOrg() :Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(`${this.apiServerUrl}/public-orgs`)
  }
}
