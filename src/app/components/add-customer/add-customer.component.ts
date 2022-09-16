import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/Customer';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
  };
  constructor(
    private cs: AddCustomerService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    // this.customer.dateAdded = new Date(this.customer.dateAdded)
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
