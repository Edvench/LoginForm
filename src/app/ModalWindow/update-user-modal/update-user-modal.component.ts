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
  private currentUser:User = 
  {
    id:this.data.id,
    name:'',
    email:'',
    role:'',
    password:''

  };
  private error:boolean = false;
  private responceSuccess:boolean = false;
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
          this.currentUser.name = response.name;
          this.currentUser.email = this.formGroup.controls["emailControl"].value,
          this.currentUser.role = this.formGroup.controls["roleControl"].value;
          this.currentUser.password = this.formGroup.controls["passwordControl"].value;
          this.closeDialog(this.currentUser);
          
        }
      },
       error => {this.error = error.error;console.log(error.error)
       });
       
}

closeDialog(user) {
  this.dialogRef.close(user);
}

  onNoClick(): void{
    this.dialogRef.close();
  }


}
