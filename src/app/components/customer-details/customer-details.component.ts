import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { Location } from '@angular/common';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/interfaces/Car';
import { Order } from 'src/app/interfaces/Order';

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
    private _location: Location,
    private cusS: AddCustomerService,
    private carS: CarsService
  ) {}

  ngOnInit(): void {
    this.cs.getCustomer().subscribe((customerData: Customer[]) => {
      this.costumers = customerData;
    });

    this.customerId = this.actRoute.snapshot.params['id'];
  }

  getDate(timestamp: any) {
    let day = new Date(timestamp.seconds * 1000).getDate();
    let month = new Date(timestamp.seconds * 1000).getMonth();
    let year = new Date(timestamp.seconds * 1000).getFullYear();

    return day < 10
      ? `0${day}/${month + 1}/${year}`
      : `${day}/${month + 1}/${year}`;
  }

  goBack() {
    this._location.back();
  }
}
