import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LOCAL_STORAGE, WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Component, OnInit, Inject } from '@angular/core';

export class AddHttpHeaderInterceptor implements HttpInterceptor {
  constructor( @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authHeader =  this.storage.get('Token');
    // console.log('ff', authHeader);
    if (authHeader != null) {
      const clonedReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
      return next.handle(clonedReq);
    } else {

      const clonedReqWithoutToken = req.clone({ headers: req.headers });
      return next.handle(clonedReqWithoutToken);
    }
    // const headers = new HttpHeaders().set('Authorization', authHeader)
    // const clonedReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
  }
}
