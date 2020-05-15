import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from '../Errors/error/error.component';
import { TableComponent } from '../table/table.component';
import { AuthGuard } from '../guards/auth.guard';
import { CreateUserModalComponent } from '../ModalWindow/create-user-modal/create-user-modal.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { LoginModalComponent } from '../ModalWindow/login-modal/login-modal.component';

export const Rout : Routes = [
    {path:"",redirectTo:"homePage",pathMatch:"full"},//Home page
    {path:"homePage",component:HomePageComponent},
    {path:"loginModal",component:LoginModalComponent},
    {path:"table",component:TableComponent, canActivate : [AuthGuard]},
    {path:"user",component:CreateUserModalComponent,outlet:'modal'},
    {path:"**",component:ErrorComponent}//Page Not Found
  ]