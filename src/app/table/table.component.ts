import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../Services/authorization.service';
import { User } from '../Entity/User';
import { Router } from '@angular/router';
import { RequestTableService } from '../Services/request-table.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserModalComponent } from '../ModalWindow/create-user-modal/create-user-modal.component';
import { DeleteUserModalComponent } from '../ModalWindow/delete-user-modal/delete-user-modal.component';
import { UpdateUserModalComponent } from '../ModalWindow/update-user-modal/update-user-modal.component';

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
  displayedColumns: string[] = ['name', 'email','options'];



  constructor(
    private auth: AuthorizationService,
    private tableService: RequestTableService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  public openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserModalComponent, {
      width: '250px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  public openUpdateUserDialog(id:number): void {
    const dialogRef = this.dialog.open(UpdateUserModalComponent, {
      data: { id: id },
      width: '250px',
    });

    let users = this.users.map(function(user){
      let newUser;
      if(user.id ==id)
      {
        
      }
    })
    // console.log(user)
    dialogRef.afterClosed().subscribe(result => {
      console.log();
    });
  }

  public openDeleteUserDialog(id:number): void {
    const dialogRef = this.dialog.open(DeleteUserModalComponent, {
      data: { id: id },
      width: '250px',
    });
    let user =   this.users.findIndex(user => id == user.id);
    this.users.splice(user,1);
    
    // dialogRef.afterClosed().subscribe(result => {
    
    //   console.log(user)
    // });
  //  this.currentPage++;
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
    // this.currentPage++;
  }

  public logout() {
    this.auth.logout()
    console.log(localStorage.getItem('isLoggedIn'))
    this.router.navigate(['']);
  }

}
