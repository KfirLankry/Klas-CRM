import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { ordersService } from 'src/app/services/orders.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customer: Customer = { firstName: '', lastName: '', phone: '', email: '' };
  costumers: Customer[] = [];
  orders: Order[] = [];
  constructor(
    private cs: AddCustomerService,
    private modal: NgbModal,
    private toastr: ToastrService,
    private os: ordersService
  ) {}

  ngOnInit(): void {
    this.cs.getCustomer().subscribe((customerData: Customer[]) => {
      this.costumers = customerData;
    });
    this.os.getAll().subscribe((data) => {
      this.orders = data;
    });
  }

  //Pipe Filter
  customerFirstName: string = '';
  customerLastName: string = '';
  customerPhone: string = '';

  // Add New Customer
  addNewCustomer(customer: Customer) {
    const modalRef = this.modal.open(AddCustomerComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = customer.id;
  }

  // Edit Customer
  editCustomer(customer: Customer) {
    const modalRef = this.modal.open(EditCustomerComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = customer.id;
  }

  // Delete Customer
  deleteCustomer(customer: Customer) {
    if (
      confirm('You are about to delete this customer, Are you sure?') &&
      confirm("All Of this customer's orders will be also deleted...")
    ) {
      this.orders.forEach((order) => {
        if (order.customer_id == customer.id) this.os.deleteOrder(order);
      });
      this.cs.deleteCustomer(customer);
      this.toastr.success('Customer Deleted Successfuly!', '', {
        progressBar: true,
        closeButton: true,
        timeOut: 1800,
      });
    }
  }

  getDate(timestamp: any) {
    let day = new Date(timestamp.seconds * 1000).getDate();
    let month = new Date(timestamp.seconds * 1000).getMonth();
    let year = new Date(timestamp.seconds * 1000).getFullYear();

    return day < 10
      ? `0${day}/${month + 1}/${year}`
      : `${day}/${month + 1}/${year}`;
  }
}
