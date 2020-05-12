import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestTableService {
  private apiEndPoint: string;

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.domainUrl;
   }

  public getUsers(countItem:number,page:number,token:string): Observable<any>{
    const params = new HttpParams()
      .set('perPage', countItem.toString())
      .set('page', page.toString())
    const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get(this.apiEndPoint + "user?" + params,{headers:myHeaders});
  }

  public createUser(name:string,email:string,role:string,password:string,token:string): Observable<any> {
    var formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('password', password);
    const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(this.apiEndPoint + "user", formData,{headers:myHeaders});
}
}
