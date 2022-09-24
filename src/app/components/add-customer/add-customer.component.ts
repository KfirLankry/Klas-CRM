import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/Customer';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  customer: Customer = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dateAdded: new Date(),
    addedBy: '',
  };
  constructor(
    private cs: AddCustomerService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private as: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    // Adding Relevant UserEmail key to Item Document
    this.customer.addedBy = this.as.getSessionData('email');
    // Adding Customer to DB
    this.cs
      .addCustomer(this.customer)
      .then(() => {
        this.toastr.success('Customer Added Successfuly!', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 1800,
        });
        this.activeModal.close();
      })
      .catch((err) => {
        this.toastr.error('Something went Wrong..', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 2000,
        });
      });
  }
}
