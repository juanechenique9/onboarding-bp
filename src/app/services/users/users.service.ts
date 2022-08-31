import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Iuser } from 'src/app/component/models/users/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private urlApi: string;
  constructor(private http: HttpClient) { 
    this.urlApi = `${environment.apiUrl}`
  }

  public getUserExist(user: any): Observable<any> {
    return this.http.get<any>(`${this.urlApi}users/exist-name/${user}`)
  }

  public getEmailExist(user: any): Observable<any> {
    return this.http.get<any>(`${this.urlApi}users/exist-name/${user}`)
  }

  public addUser(user:Iuser): Observable<Iuser> {
    return this.http.post<Iuser>(`${this.urlApi}users/`, user);
  }

  
}
