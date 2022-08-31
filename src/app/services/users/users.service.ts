import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Iuser } from 'src/app/component/models/users/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private urlApi: string;
  constructor(private http: HttpClient) { 
    this.urlApi = `${environment.apiUrl}`
  }

  public getUserExist(user: any): Observable<any> {
    return this.http.get<any>(`${this.urlApi}users/exist-name/${user}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
