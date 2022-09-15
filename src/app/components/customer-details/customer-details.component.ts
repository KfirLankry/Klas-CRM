import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  costumers: Customer[] = [];
  customerId: any = '';
  constructor(
    private actRoute: ActivatedRoute,
    private cs: AddCustomerService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.cs.getCustomer().subscribe((customerData: Customer[]) => {
      this.costumers = customerData;
      console.log(this.costumers);
    });

    this.customerId = this.actRoute.snapshot.params['id'];
  }

  goBack() {
    this._location.back();
  }
}
