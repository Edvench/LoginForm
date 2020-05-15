import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../Services/authorization.service';
import { User } from '../Entity/User';
import { Router } from '@angular/router';
import { RequestTableService } from '../Services/request-table.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserModalComponent } from '../ModalWindow/create-user-modal/create-user-modal.component';
import { DeleteUserModalComponent } from '../ModalWindow/delete-user-modal/delete-user-modal.component';
import { UpdateUserModalComponent } from '../ModalWindow/update-user-modal/update-user-modal.component';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private users: User[] = [];
  private countItem: number = 5;
  private currentPage: number = 1;
  private countPage: number;
  private userId:number;
  private role:string;
  private access:boolean = false;
  private displayedColumns: string[] = ['name', 'email','options'];
  private currentUser:any = {
    name:'',
    email:'',
    role:'',

  };



  constructor(
    private auth: AuthorizationService,
    private tableService: RequestTableService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
    this.role = localStorage.getItem('role');
    console.log(this.role)
    if(this.role == "admin")
    {
      this.access = true;
    }
  }

  public openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserModalComponent, {
      width: '250px',
    });

  }

  public openUpdateUserDialog(id:number): void {
    
    let userIndex = this.users.findIndex(user=>user.id == id);
    let user = this.users[userIndex]
    this.currentUser = {
      'name' : user.name,
      'email' : user.email,
      'role':user.role,
    }
    
    const dialogRef = this.dialog.open(UpdateUserModalComponent, {
      data: { id: id,
        name:this.currentUser.name,
        email:this.currentUser.email,
        role:this.currentUser.role,},
      width: '250px',
    });
    console.log(this.currentUser)

    dialogRef.afterClosed().subscribe(result => {
      let userIndex = this.users.findIndex(user=>user.id == id);
      console.log(userIndex);
       this.users[userIndex] = {
        'id':result.id,
        'name' : result.name,
        'email' : result.email,
        'role' : result.role,
        'password' : result.password,
      }
    });
  }

  public openDeleteUserDialog(id:number): void {
    const dialogRef = this.dialog.open(DeleteUserModalComponent, {
      data: { id: id },
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == "ok")
      {
        let user =   this.users.findIndex(user => id == user.id);
        this.users.splice(user,1);
      }

    });   
}

  public getUsers(): void {
    this.tableService.getUsers(this.countItem, this.currentPage, localStorage.getItem('token')).subscribe(
      response => {
        response.data.forEach(element => {
          this.users.push(element);
          this.countPage = Math.ceil(this.countPage = response.total / this.countItem);
        });

        console.log(this.users)
      });
     this.currentPage++;
  }

  public logout() {
    this.auth.logout()
    console.log(localStorage.getItem('isLoggedIn'))
    this.router.navigate(['']);
  }

}
