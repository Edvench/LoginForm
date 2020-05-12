import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../Services/authorization.service';
import { User } from '../Entity/User';
import { Router } from '@angular/router';
import { RequestTableService } from '../Services/request-table.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserModalComponent } from '../ModalWindow/create-user-modal/create-user-modal.component';

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
  displayedColumns: string[] = ['name', 'email'];



  constructor(
    private auth: AuthorizationService,
    private tableService: RequestTableService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserModalComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
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
