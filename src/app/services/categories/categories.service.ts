import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private urlApi: string;
  constructor(private http: HttpClient) { 
    this.urlApi = `${environment.apiUrl}`
  }

  public getCategories(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}category`);
  }
}
