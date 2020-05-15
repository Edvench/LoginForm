import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignupService } from 'src/app/Services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-user-modal',
  templateUrl: './signup-user-modal.component.html',
  styleUrls: ['./signup-user-modal.component.css']
})
export class SignupUserModalComponent implements OnInit {
  private formGroup:FormGroup;
  private error:boolean = false;
  private visible:boolean = true;
  private success:boolean = false;
  constructor(private fb:FormBuilder,
    private dialogRef: MatDialogRef<SignupUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private signUpService:SignupService,
    private router:Router) {
      this.formGroup = fb.group({
        nameControl:     ["", [ Validators.required]],
        emailControl:     ["", [ Validators.required,
                                 Validators.email]],
        passwordControl:     ["", [ Validators.required,
                                    Validators.pattern('^[a-z]{4,100}$')]]                         
      })
     }

  ngOnInit() {
  }

  public signUp(){
    this.signUpService.signUpUser(this.formGroup.controls["nameControl"].value,
    this.formGroup.controls["emailControl"].value, 
    this.formGroup.controls["passwordControl"].value).subscribe(
      response =>{
        if(response){   
          this.success = true;
          this.visible = false
        }
      },
       error => {this.error = error.error;console.log(error.error)
       });
  }

  closeDialog():void {
    this.dialogRef.close();
  }

}
