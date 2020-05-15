import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../Entity/User';

@Injectable({
  providedIn: 'root'
})
export class RequestTableService {
  private apiEndPoint: string;
  private users:User[] = [];

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.domainUrl;
  }

  public getUsers(countItem: number, page: number, token: string): Observable<any> {
    const params = new HttpParams()
      .set('perPage', countItem.toString())
      .set('page', page.toString())
    const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get(this.apiEndPoint + "user?" + params, { headers: myHeaders });
  }

  public createUser(name: string, email: string, role: string, password: string, token: string): Observable<any> {
    var formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('password', password);
    const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(this.apiEndPoint + "user", formData, { headers: myHeaders });
  }

  public updateUser(id: number, token: string,name?: string, email?: string, role?: string, password?: string ): Observable<any> {
    var user = new User();
    user.name = name;
    user.email = email;
    user.role = role;
    user.password = password;
    
    const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put(this.apiEndPoint + "user/" + id, user,{ headers: myHeaders });
  }

  public deleteUsers(id: number, token: string): Observable<any> {
    console.log(id);
    const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(this.apiEndPoint + "user/" + id, { headers: myHeaders });
  }

}
