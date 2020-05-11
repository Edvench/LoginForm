import { RouterModule, Routes } from '@angular/router';

import { AuthorizationComponent } from '../LoginModal/login-modal.component';
import { ErrorComponent } from '../Errors/error/error.component';
import { TableComponent } from '../table/table.component';
import { AuthGuard } from '../guards/auth.guard';

export const Rout : Routes = [
    {path:"",redirectTo:"loginModal",pathMatch:"full"},//Home page
    {path:"loginModal",component:AuthorizationComponent},
    {path:"table",component:TableComponent},
    {path:"**",component:ErrorComponent}//Page Not Found
  ]