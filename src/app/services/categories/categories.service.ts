import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
