import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Organization} from "../../models/organization";
import {GeneralService} from "../general.service";

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private apiServerUrl = environment.apiBaseUrlOrg;
  private apiManagers = environment.apiBaseUrlManager

  constructor(private httpClient: HttpClient,
              private gen: GeneralService) {
  }

  public getOrgById(id: number) :Observable<Organization> {
    return this.httpClient.get<Organization>(`${this.apiServerUrl}/public-orgs/${id}`).pipe(
      catchError(this.gen.handleError<Organization>("get org id"))
    )
  }


  public getAllPublicOrg() :Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(`${this.apiServerUrl}/public-orgs?name=`)
  }

  public getOrgByCreatorId() :Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(`${this.apiServerUrl}/orgs-creator`)
  }

  public getOrgForRole(role: string) :Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(`${this.apiManagers}/orgs/${role}`)
  }

  public getAllPublicOrgByName(term: string): Observable<Organization[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.httpClient.get<Organization[]>(`${this.apiServerUrl}/public-orgs?name=${term}`);
  }

  public createOrg(org: Organization, file: any) : Observable<any> {
    const payload = new FormData();

    payload.append("org", JSON.stringify(org));
    payload.append("file", file);

    return this.httpClient.post(`${this.apiServerUrl}/create-org`, payload, {responseType: 'text'})
  }


}
