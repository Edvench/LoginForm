import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../Services/authorization.service';
import { AuthenticationService } from '../Services/authentication.service';
import { User } from '../Entity/User';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class AuthorizationComponent implements OnInit {

  private formGroup:FormGroup;
  private token: string;
  private users: User[] = []; 
  // private fullResponce: any;

  constructor(
    private fb:FormBuilder,
    private $authorization:AuthorizationService,
    private $authentication:AuthenticationService
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
    this.$authentication.getToken(
      this.formGroup.controls["emailControl"].value,
      this.formGroup.controls["passwordControl"].value,
    ).subscribe(
      response => {
        this.token = response.token;
        console.log(response);
        console.log(this.token);
        this.$authorization.getAcces(-1,this.token).subscribe(
          response => {
            // this.fullResponce = response;
            response.data.forEach(element => {
              this.users.push(element);
          });
          // console.log(this.fullResponce);
          console.log(this.users)
          });
      });
  }

}

