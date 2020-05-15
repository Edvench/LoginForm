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
  private updatedUser:User = 
  {
    id:this.data.id,
    name:'',
    email:'',
    role:'',
    password:''

  };

  private error:boolean = false;
  private responceSuccess:boolean = false;
  private success:boolean = false;
  public roles: Role[] = [
    {value: 'admin', viewValue: 'admin'},
    {value: 'user', viewValue: 'user'}
  ];
  constructor(private fb:FormBuilder,
    private tableService: RequestTableService,
    private dialogRef: MatDialogRef<UpdateUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.formGroup = fb.group({
        nameControl:     [this.data.name, [ Validators.required]],
        emailControl:     [this.data.email, [ Validators.required,
                                 Validators.email]],
        roleControl:     [this.data.role, [ Validators.required]],
        passwordControl:     ['', [ Validators.required,
                                    Validators.pattern('^[a-z]{4,100}$')]]                         
      })
    }

  ngOnInit() {

  }

  public updateUser() {
    console.log(this.data.id)
    this.tableService.updateUser(this.data.id,
      localStorage.getItem('token'),
    this.formGroup.controls["nameControl"].value,
    this.formGroup.controls["emailControl"].value, 
    this.formGroup.controls["roleControl"].value,
    this.formGroup.controls["passwordControl"].value 
    ).subscribe(
      response => {
        if(response){   
          this.success = true;
          this.updatedUser.id = this.data.id;
          this.updatedUser.name = response.name;
          this.updatedUser.email = this.formGroup.controls["emailControl"].value,
          this.updatedUser.role = this.formGroup.controls["roleControl"].value;
          this.updatedUser.password = this.formGroup.controls["passwordControl"].value;
          this.closeDialogWithUpdate(this.updatedUser);
          
        }
      },
       error => {this.error = error.error;console.log(error.error)
       });
       
}

closeDialogWithUpdate(user):void {
  this.dialogRef.close(user);
}

closeDialog():void {
  this.dialogRef.close();
}

// public getCurrentUser(id:number){
//   id = this.data.id;
  
// }
}
