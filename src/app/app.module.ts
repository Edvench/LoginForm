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

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizationComponent } from './LoginModal/login-modal.component';
import { AuthorizationService } from './Services/authorization.service';
import { TableComponent } from './table/table.component';
import { ErrorComponent } from './Errors/error/error.component';
import { RouterModule } from '@angular/router';
import { Rout } from './Routing/route';
import { CreateUserModalComponent } from './ModalWindow/create-user-modal/create-user-modal.component';
import { DeleteUserModalComponent } from './ModalWindow/delete-user-modal/delete-user-modal.component';
import { UpdateUserModalComponent } from './ModalWindow/update-user-modal/update-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    TableComponent,
    ErrorComponent,
    CreateUserModalComponent,
    DeleteUserModalComponent,
    UpdateUserModalComponent,
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
    MatSelectModule
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
  entryComponents: [DeleteUserModalComponent,UpdateUserModalComponent],
})
export class AppModule { }
