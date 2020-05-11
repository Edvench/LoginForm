import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard'; 

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizationComponent } from './LoginModal/login-modal.component';
import { AuthorizationService } from './Services/authorization.service';
import { TableComponent } from './table/table.component';
import { ErrorComponent } from './Errors/error/error.component';
import { RouterModule } from '@angular/router';
import { Rout } from './Routing/route';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    TableComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot(Rout)
    

  ],
  providers: [
    AuthorizationService,
    AuthGuard,
    RouterModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
