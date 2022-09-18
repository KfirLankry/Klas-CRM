import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { Location } from '@angular/common';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/interfaces/Car';
import { Order } from 'src/app/interfaces/Order';
import { ordersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  costumers: Customer[] = [];
  ordersArr: Order[] = [];
  cars: Car[] = [];
  customerId: any = '';
  constructor(
    private actRoute: ActivatedRoute,
    private cs: AddCustomerService,
    private _location: Location,
    private os: ordersService,
    private carS: CarsService
  ) {}

  ngOnInit(): void {
    this.os.getAll().subscribe((data: Order[]) => {
      for (let order of data) {
        if (order.customer_id == this.customerId) {
          this.ordersArr.push(order);
        }
      }
    });

    this.carS.getAll().subscribe((data) => {
      this.cars = data;
    });

    this.cs.getCustomer().subscribe((customerData: Customer[]) => {
      this.costumers = customerData;
    });

    this.customerId = this.actRoute.snapshot.params['id'];
    console.log(this.customerId);
  }

  getDate(timestamp: any) {
    let day = new Date(timestamp.seconds * 1000).getDate();
    let month = new Date(timestamp.seconds * 1000).getMonth();
    let year = new Date(timestamp.seconds * 1000).getFullYear();

    return day < 10
      ? `0${day}/${month + 1}/${year}`
      : `${day}/${month + 1}/${year}`;
  }

  getCarById(ID: string): Car | any {
    if (!this.cars.length) return {};
    let match = this.cars.filter((car) => car.id == ID);
    return match[0];
  }

  goBack() {
    this._location.back();
  }
}
