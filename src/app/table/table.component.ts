import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../Services/authorization.service';
import { User } from '../Entity/User';
import { Router } from '@angular/router';
import { RequestTableService } from '../Services/request-table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private users: User[] = []; 

  constructor(
    private auth:AuthorizationService,
    private tableService:RequestTableService,
    private router:Router) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers():void{
    this.tableService.getUsers(5,2, localStorage.getItem('token')).subscribe(
      response => {
        response.data.forEach(element => {
          this.users.push(element);
      });
      console.log(this.users)
      });
       
  }

  public logout(){
    this.auth.logout()
    console.log(localStorage.getItem('isLoggedIn'))
    this.router.navigate(['']);
  }
  

  
}
