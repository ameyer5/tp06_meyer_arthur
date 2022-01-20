import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiHttpInterceptor implements HttpInterceptor {

  jwtToken: String = '';

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwtToken) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${this.jwtToken}` }});
    }
    return next.handle(req).pipe(tap(
      (evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          let tab: Array<String>;

          console.log(evt);
          let enteteAuthorization = evt.body;
          console.log("entete " + enteteAuthorization);
          if (enteteAuthorization != null && typeof enteteAuthorization == 'string') {
            tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
            if (tab.length > 1) {
              this.jwtToken = tab [1];
              this.token = tab [1];
              console.log("Authenticating with " + this.token);
            }
          }
        }
      },
      (error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
          case 401:
        }
        return of(null);
      }
      ));
  }

  get token(): String {
    const token = localStorage.getItem('auth_token');

    return token ? JSON.parse(token) : null;
  }

  set token(token: String) {
    localStorage.setItem('auth_token', JSON.stringify(token));
  }


  public isAuthenticated(): boolean {
    console.log("Authenticated - " + this.token);
    return (this.token != null);
  }
}
