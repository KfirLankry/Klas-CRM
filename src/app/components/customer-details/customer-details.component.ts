import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { Location } from '@angular/common';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/interfaces/Car';
import { Order } from 'src/app/interfaces/Order';
import { ordersService } from 'src/app/services/orders.service';
import { CarDetailsComponent } from '../car-details/car-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  pastOrders: Order[] = [];
  activeOrders: Order[] = [];
  futureOrders: Order[] = [];
  constructor(
    private actRoute: ActivatedRoute,
    private cs: AddCustomerService,
    private _location: Location,
    private os: ordersService,
    private carS: CarsService,
    private router: Router,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.ordersArr = [];
    this.pastOrders = [];
    this.activeOrders = [];
    this.futureOrders = [];

    this.os.getAll().subscribe((data: Order[]) => {
      for (let order of data) {
        if (order.customer_id == this.customerId) {
          this.ordersArr.push(order);
        }
      }

      this.pastOrders = [];
      this.activeOrders = [];
      this.futureOrders = [];
      this.ordersArr.forEach((order) => {
        let today: Date = new Date();
        let startDate: Date = new Date(this.getDate(order.start, 'diff'));
        let endDate: Date = new Date(this.getDate(order.end, 'diff'));
        if (startDate < today && endDate < today) this.pastOrders.push(order);
        else if (startDate < today && endDate > today)
          this.activeOrders.push(order);
        else this.futureOrders.push(order);
      });
    });

    this.carS.getAll().subscribe((data) => {
      this.cars = data;
    });

    this.cs.getCustomer().subscribe((customerData: Customer[]) => {
      this.costumers = customerData;
      let testArr = [];
      customerData.forEach((customer) => {
        if (customer.id != this.customerId) testArr.push(customer);
        if (testArr.length == customerData.length) {
          this.router.navigateByUrl('/pnf');
        }
      });
    });

    this.customerId = this.actRoute.snapshot.params['id'];
    // console.log(this.customerId);
  }

  getDate(timestamp: any, type: string): string {
    let day = new Date(timestamp.seconds * 1000).getDate();
    let month = new Date(timestamp.seconds * 1000).getMonth();
    let year = new Date(timestamp.seconds * 1000).getFullYear();

    if (type == 'diff') return `${month + 1}/${day}/${year}`;

    return day < 10
      ? `0${day}/${month + 1}/${year}`
      : `${day}/${month + 1}/${year}`;
  }

  getCarById(ID: string): Car | any {
    if (!this.cars.length) return {};
    return this.cars.filter((car) => car.id == ID)[0];
  }

  carDetails(id: string) {
    const modalRef = this.modal.open(CarDetailsComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = id;
  }

  goBack() {
    this._location.back();
  }
}
