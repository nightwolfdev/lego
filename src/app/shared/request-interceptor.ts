import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { host, key } from '../../environments/api';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiRequest = request.url.includes(host);
    
    if (isApiRequest) {
      request = request.clone({
        setHeaders: {
          Authorization: `key ${key}`
        }
      });
    }
    
    return next.handle(request);
  }
}
