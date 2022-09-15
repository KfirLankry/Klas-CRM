import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/Customer';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  @Input() id?: string;
  customer: Customer = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    note: '',
  };

  constructor(
    private cs: AddCustomerService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.cs.getCustomerId(this.id).subscribe((itemData: Customer) => {
        this.customer = itemData;
      });
    }
  }

  updateCustomer(): void {
    this.cs
      .editCustomer(this.customer)
      .then(() => {
        this.toastr.success('Customer Edited Successfuly!', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 1800,
        });
        this.activeModal.close();
      })
      .catch(() => {
        this.toastr.error('Somthing went Wrong...', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 1800,
        });
      });
  }
}
