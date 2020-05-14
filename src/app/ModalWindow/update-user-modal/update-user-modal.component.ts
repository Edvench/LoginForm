import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestTableService } from 'src/app/Services/request-table.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Entity/User';
import { Observable } from 'rxjs';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.css']
})
export class UpdateUserModalComponent implements OnInit {
  private formGroup:FormGroup;
  private error:boolean = false;
  public roles: Role[] = [
    {value: 'admin', viewValue: 'admin'},
    {value: 'user', viewValue: 'user'}
  ];
  constructor(private fb:FormBuilder,
    private tableService: RequestTableService,
    private dialogRef: MatDialogRef<UpdateUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
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

  public updateUser() {
    this.tableService.updateUser(this.data.id,
      localStorage.getItem('token'),
    this.formGroup.controls["nameControl"].value,
    this.formGroup.controls["emailControl"].value, 
    this.formGroup.controls["roleControl"].value,
    this.formGroup.controls["passwordControl"].value 
    ).subscribe(
      response => {
        if(response){   
          this.onNoClick();
          
        }
        console.log(response);
      },
       error => {this.error = error.error;console.log(error.error)
       });
}

  onNoClick(): Observable<User> {
    let user:User = {
    'id': this.data.id,
    'name': this.formGroup.controls["nameControl"].value,
    'email': this.formGroup.controls["emailControl"].value, 
    'role':this.formGroup.controls["roleControl"].value,
    'password': this.formGroup.controls["passwordControl"].value 
    };
  
    console.log(user);
    // user.name = this.formGroup.controls["nameControl"].value,
    // user.email = this.formGroup.controls["emailControl"].value, 
    // user.role = this.formGroup.controls["roleControl"].value,
    // user.password = this.formGroup.controls["passwordControl"].value 
    this.dialogRef.close();
    return 
  }


}
