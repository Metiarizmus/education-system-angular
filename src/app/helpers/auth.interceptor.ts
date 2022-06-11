import {Injectable} from "@angular/core";
import {AuthService} from "../shared/services/api-service/auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService,
              private storage: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone();
    const token: string | null = this.storage.retrieve("accessToken")
    if (token) {
      req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(req).pipe(
      catchError((err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            // redirect user to the logout page

          }
        }
        return throwError(err);
      }))
    );
  }
}
