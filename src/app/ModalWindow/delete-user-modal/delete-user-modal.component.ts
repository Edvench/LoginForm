import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RequestTableService } from 'src/app/Services/request-table.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/Entity/User';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {
  private error:boolean = false;
  private success:boolean = false;
  private users:User[] = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteUserModalComponent>,
    private tableService: RequestTableService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  public deleteUser(){
    this.tableService.deleteUsers(this.data.id,localStorage.getItem('token')).subscribe(
      response => {
        if(response){
          this.success = true;         
          this.checkStatusAndCloseDialog("ok");
        }
        console.log(response);
      },
       error => {this.error = error.error;console.log(error.error)
       });
  }

  checkStatusAndCloseDialog(status:string): void {
    this.dialogRef.close(status);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
