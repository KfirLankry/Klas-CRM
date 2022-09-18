import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PnfComponent } from './components/pnf/pnf.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ReportsComponent } from './components/reports/reports.component';
import { GauthGuard } from './guards/gauth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard/reports',
    component: ReportsComponent,
    canActivate: [GauthGuard],
  },
  {
    path: 'dashboard/customers',
    component: CustomersComponent,
    canActivate: [GauthGuard],
  },
  {
    path: 'dashboard/customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [GauthGuard],
  },
  {
    path: 'dashboard/contacts',
    component: ContactsComponent,
    canActivate: [GauthGuard],
  },
  {
    path: 'dashboard/orders',
    component: OrdersComponent,
    canActivate: [GauthGuard],
  },
  {
    path: 'dashboard/profile',
    component: ProfileComponent,
    canActivate: [GauthGuard],
  },
  {
    path: 'dashboard/cardetail',
    component: CarDetailsComponent,
    canActivate: [GauthGuard],
  },
  { path: '**', component: PnfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
