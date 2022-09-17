import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/interfaces/Car';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { CarsService } from 'src/app/services/cars.service';
import { ordersService } from 'src/app/services/orders.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  allOrders: Order[] = []
  order: Order = {
    start: new Date(),
    end: new Date(),
    car_id: '',
    customer_id: '',
    sum: 0,
    notes: '',
  };
  customer: Customer = { firstName: '', lastName: '', phone: '', email: '' };
  cars: Car[] = [];
  customers: Customer[] = [];

  constructor(
    private carS: CarsService,
    private cusS: AddCustomerService,
    private os: ordersService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.cusS.getCustomer().subscribe((data) => {
      this.customers = data;
    });
    this.carS.getAll().subscribe((data) => {
      this.cars = data;
    });
    this.os.getAll().subscribe((data)=>{
      this.allOrders = data
    })
  }

  calcOrderSum(startDate: Date, endDate: Date, price: number) {
    let _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // console.log(startDate.getUTCFullYear());
    if (!startDate) return '';
    if (!price) return 0;

    let modStartDate = new Date(startDate);
    let modEndDate = new Date(endDate);

    let utc1 = Date.UTC(
      modStartDate.getFullYear(),
      modStartDate.getMonth(),
      modStartDate.getDate()
    );
    let utc2 = Date.UTC(
      modEndDate.getFullYear(),
      modEndDate.getMonth(),
      modEndDate.getDate()
    );

    let sum = Math.floor((utc2 - utc1) / _MS_PER_DAY) * price;
    if (sum == 0) return price;
    // this.order.sum = sum
    return sum;
  }

  getCarPriceById(ID: string) {
    let price: number = 0;
    this.cars.forEach((car) => {
      if (car.id == ID) price = car.price;
    });
    return price;
  }

  onSubmit() {
    this.order.sum = this.calcOrderSum(
      this.order.start,
      this.order.end,
      this.getCarPriceById(this.order.car_id)
    ) as number;
    this.order.start = new Date(this.order.start);
    this.order.end = new Date(this.order.end);
    this.os.addOrder(this.order);
    this.modal.dismissAll();
  }

  // Add New Customer
  addNewCustomer() {
    const modalRef = this.modal.open(AddCustomerComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
  }

  getDate(timestamp:any){
    let day = new Date(timestamp.seconds*1000).getDate()
    let month = new Date(timestamp.seconds*1000).getMonth()
    let year = new Date(timestamp.seconds*1000).getFullYear() 
    
    return day<10? `${month}/0${day}/${year}` : `${month}/${day}/${year}`
  }

  checkCarAvailabillity(startDate:Date, endDate:Date, carID:string|undefined):boolean{

    let relevantOrders:Order[] = []
    let result:boolean = true
    
    this.allOrders.forEach((order)=>{
      if(order.car_id == carID) relevantOrders.push(order)
    })

    relevantOrders.forEach((order)=>{
      
      if(new Date(this.getDate(order.start))<=endDate && new Date(this.getDate(order.end))>=startDate) result =  false
    })

    console.log(result);
    

    return result
  }
}
