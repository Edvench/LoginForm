import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private apiEndPoint: string;

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.domainUrl;
  }

  ///Вход в систему за определенной ролью(логин)
  public getAcces(perPage:number,token:string): Observable<any>{
    const params = new HttpParams()
      .set('perPage', perPage.toString())
    const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get(this.apiEndPoint + "user?" + params,{headers:myHeaders});
  }
}
