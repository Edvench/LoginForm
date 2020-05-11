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
}
