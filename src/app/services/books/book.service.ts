import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Ibook } from 'src/app/component/models/books/book';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = `${environment.apiUrl}`
   }

  public getBook(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}books/owner`);
  }

  public addBook(book:Ibook): Observable<Ibook> {
    return this.http.post<Ibook>(`${this.urlApi}books/owner`, book);
  }
}
