import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiEndPoint: string;

  constructor(private http:HttpClient) {
    this.apiEndPoint = environment.domainUrl;
   }

   ///Получение токена
   public getToken(login: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', login)
      .set('password', password)

    return this.http.post(this.apiEndPoint + "login", params);
  }
}
