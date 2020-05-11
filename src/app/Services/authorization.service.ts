import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private apiEndPoint: string;
  status:any

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.domainUrl;
  }

  public getToken(login: string, password: string):Observable<any>{
    let token:any;
    const params = new HttpParams()
    
      .set('email', login)
      .set('password', password)
      return this.http.post(this.apiEndPoint + "login", params,{observe: 'response'})
      
  }

  
  public logout (): void  {    
    localStorage.setItem ( 'isLoggedIn' , 'false' );    
    localStorage.removeItem ( 'token' );    
    }
}
