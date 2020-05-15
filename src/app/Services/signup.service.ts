import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiEndPoint: string;

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.domainUrl
   }

   public signUpUser(name:string,email:string,password:string):Observable<any>{
    var formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    return this.http.post(this.apiEndPoint + "signup", formData); 
   }
}
