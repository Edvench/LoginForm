import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../ModalWindow/login-modal/login-modal.component';
import { SignupUserModalComponent } from '../ModalWindow/signup-user-modal/signup-user-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '250px',
    });

  }

  public openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignupUserModalComponent, {
      width: '250px',
    });

  }

}
