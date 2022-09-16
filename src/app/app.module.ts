import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowListComponent } from './components/show-list/show-list.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { FilterPipe } from './pipes/filter.pipe';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LoginComponent } from './components/login/login.component';
import { PnfComponent } from './components/pnf/pnf.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReminderComponent } from './components/reminder/reminder.component';
import { EditReminderComponent } from './components/edit-reminder/edit-reminder.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { ReportsComponent } from './components/reports/reports.component';

import { ChartModule, LineSeriesService, CategoryService, LegendService, DataLabelService, TooltipService, AccumulationChartModule, PieSeriesService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, ColumnSeriesService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    CustomersComponent,
    ContactsComponent,
    ShowListComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    CustomerDetailsComponent,
    FilterPipe,
    StatisticsComponent,
    LoginComponent,
    PnfComponent,
    ReminderComponent,
    EditReminderComponent,
    RegisterComponent,
    OrdersComponent,
    AddOrderComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    ChartModule,
    AccumulationChartModule
  ],
  providers: [LineSeriesService, CategoryService, LegendService, DataLabelService, TooltipService, PieSeriesService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, ColumnSeriesService, MultiLevelLabelService, SelectionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
