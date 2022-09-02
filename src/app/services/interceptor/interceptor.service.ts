import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  url401 = '';
  reload = 0;

  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('access_token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
        'Authorization': `Bearer ${token}`,
        },
      });
    }

    if (this.reload > 30) {
      setTimeout( () => {
        this.reload = 0;
      }, 10000);
      return EMPTY;
    } else {
      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.status === 200) {
            this.url401 = '';
            this.reload = 0;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            if (this.url401 == request.url) {
              if (this.reload > 12) {
                this.reload = 0;
              } else {
                this.reload++;
              }
            } else {
              this.url401 = request.url;
              this.reload = 0;
            }

            sessionStorage.removeItem('access_token');
            if (this.router.url == '/login' || this.router.url == '/') {
            } else {
              this.router.navigateByUrl('/login');
            }
          }
          return throwError(err);
        })
      );
    }
  }
}
