import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PnfComponent } from './components/pnf/pnf.component';
import { RegisterComponent } from './components/register/register.component';
import { GauthGuard } from './guards/gauth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
  { path: '**', component: PnfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
