import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestTableService } from 'src/app/Services/request-table.service';
import { MatDialogRef } from '@angular/material/dialog';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css']
})

export class CreateUserModalComponent implements OnInit {
  private formGroup:FormGroup;
  private error:boolean = false;
  private responseID:boolean = false;
  public roles: Role[] = [
    {value: 'admin', viewValue: 'admin'},
    {value: 'user', viewValue: 'user'}
  ];
  
  constructor(private fb:FormBuilder,
    private tableService: RequestTableService,
    private dialogRef: MatDialogRef<CreateUserModalComponent>) {
    this.formGroup = fb.group({
      nameControl:     ["", [ Validators.required]],
      emailControl:     ["", [ Validators.required,
                               Validators.email]],
      roleControl:     ["", [ Validators.required]],
      passwordControl:     ["", [ Validators.required,
                                  Validators.pattern('^[a-z]{4,100}$')]]                         
    })
   }

  ngOnInit() {
  }

  public addUser() {
    this.responseID = false;
    this.tableService.createUser(
    this.formGroup.controls["nameControl"].value,
    this.formGroup.controls["emailControl"].value, 
    this.formGroup.controls["roleControl"].value,
    this.formGroup.controls["passwordControl"].value, 
    localStorage.getItem('token')).subscribe(
      response => {
        this.responseID = response.id;
      },
      error => {this.error = error.error.email;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
