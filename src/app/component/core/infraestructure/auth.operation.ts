import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthRepository } from "../application/auth.repository";
import { Auth } from "../domain/auth";
import { Token } from "../domain/token";

@Injectable()
export class AuthOperation extends AuthRepository {
    private urlApi: string;
    constructor(private http: HttpClient) {
        super()
        this.urlApi = `${environment.apiUrl}`
    }
    
    login(auth: Auth): Observable<Token> {
       return this.http.post<Token>(`${this.urlApi}users/login`, auth);
    }
}