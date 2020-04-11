import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    let reqUrl = environment.production
    req = req.clone({
      headers:req.headers.set(
        "Authorization", "Bearer" + localStorage.getItem("token")
      ),
      url: reqUrl + "" + reqUrl
    })
    return next.handle(req)
  }

  constructor() { }
}
