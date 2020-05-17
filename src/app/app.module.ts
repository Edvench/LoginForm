import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard'; 
import {MatTableModule} from '@angular/material/table';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizationService } from './Services/authorization.service';
import { TableComponent } from './table/table.component';
import { ErrorComponent } from './Errors/error/error.component';
import { RouterModule } from '@angular/router';
import { Rout } from './Routing/route';
import { CreateUserModalComponent } from './ModalWindow/create-user-modal/create-user-modal.component';
import { DeleteUserModalComponent } from './ModalWindow/delete-user-modal/delete-user-modal.component';
import { UpdateUserModalComponent } from './ModalWindow/update-user-modal/update-user-modal.component';
import { SignupUserModalComponent } from './ModalWindow/signup-user-modal/signup-user-modal.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginModalComponent } from './ModalWindow/login-modal/login-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ErrorComponent,
    CreateUserModalComponent,
    DeleteUserModalComponent,
    UpdateUserModalComponent,
    SignupUserModalComponent,
    HomePageComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot(Rout),
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [
    AuthorizationService,
    AuthGuard,
    RouterModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteUserModalComponent,
    UpdateUserModalComponent,
    SignupUserModalComponent],
})
export class AppModule { }
