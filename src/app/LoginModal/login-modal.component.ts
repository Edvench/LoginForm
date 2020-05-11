import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../Services/authorization.service';
import { User } from '../Entity/User';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class AuthorizationComponent implements OnInit {

  private formGroup:FormGroup;
  private token: string;
  private role:string;
  private users: User[] = []; 
  error:boolean = false;
  

  constructor(
    private fb:FormBuilder,
    private auth:AuthorizationService,
    private router:Router
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
    this.auth.getToken(
      this.formGroup.controls["emailControl"].value,
      this.formGroup.controls["passwordControl"].value,
    ).subscribe(response => {
      token = response.body.token;
      localStorage.setItem('token', token);
      console.log(token);
      localStorage.setItem('isLoggedIn', "true");  
      localStorage.setItem('token',token);
      this.router.navigate(['table']);
     },
      error => {this.error = error.error.error; console.log(error.error.error);
    
    });
        
  }



}

