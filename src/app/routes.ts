import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoute: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
