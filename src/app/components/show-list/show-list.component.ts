import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/Customer';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
})
export class ShowListComponent implements OnInit {
  customer: Customer = { firstName: '', lastName: '', phone: '', email: '' };
  costumers: Customer[] = [];
  constructor(
    private cs: AddCustomerService,
    private modal: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cs.getCustomer().subscribe((customerData: Customer[]) => {
      this.costumers = customerData;
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
    if (confirm('You are about to delete this customer, Are you sure?')) {
      this.cs.deleteCustomer(customer);
      this.toastr.success('Customer Deleted Successfuly!', '', {
        progressBar: true,
        closeButton: true,
        timeOut: 1800,
      });
    }
  }
}
