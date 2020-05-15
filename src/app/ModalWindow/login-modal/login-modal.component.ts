import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/Entity/User';
import { AuthorizationService } from 'src/app/Services/authorization.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  private formGroup:FormGroup;
  // private token: string;
  // private role:string;
  private users: User[] = []; 
  private error:boolean = false;
  

  constructor(
    private fb:FormBuilder,
    private auth:AuthorizationService,
    private router:Router,
    private dialogRef: MatDialogRef<LoginModalComponent>
    ) { 
    this.formGroup = fb.group({
      emailControl:     ["", [ Validators.required,
                               Validators.email]],
      passwordControl:     ["", [ Validators.required,
                                  Validators.pattern('^[a-z]{4,100}$')]]                         
    })
  }

  ngOnInit() {
  }

  
  public authorization():void{
    let token;
    let role;
    this.auth.getToken(
      this.formGroup.controls["emailControl"].value,
      this.formGroup.controls["passwordControl"].value,
    ).subscribe(response => {
      token = response.body.token;
      role = response.body.role;
      localStorage.setItem('token', token);
      localStorage.setItem('role',role)
      console.log(token);
      console.log(role);
      localStorage.setItem('isLoggedIn', "true");  
      localStorage.setItem('token',token);
      this.router.navigate(['table']);
      this.dialogRef.close();
     },
      error => {this.error = error.error.error; console.log(error.error.error);
    
    });
        
  }

}
