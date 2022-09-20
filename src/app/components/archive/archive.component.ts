import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/Car';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { CarsService } from 'src/app/services/cars.service';
import { ordersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  cars:Car[] = []
  orders:Order[] = []
  carsWithOrders:string[] = []
  carsIncome:any = []
  customers:Customer[] = []

  constructor(private os: ordersService, private cs: CarsService, private cusS:AddCustomerService) { }

  ngOnInit(): void {
    this.carsWithOrders = []
    this.cs.getAll().subscribe((data)=>{
      this.cars = data
    })
    this.os.getAll().subscribe((data)=>{
      this.orders = data
      data.forEach((order)=>{
        this.cars.forEach((car)=>{
          if(car.id == order.car_id) this.carsWithOrders.push(car.model)
        })
      })
      this.cars.forEach((car)=>{
        let incomeSum = 0;
        this.orders.forEach((order) => {
          if (order.car_id == car.id) {
            incomeSum += order.sum
          }
        });
        this.carsIncome.push({
          id: car.id,
          sum: incomeSum
        })
      })
    })
    this.cusS.getCustomer().subscribe((data)=>{
      this.customers = data
    })
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

  dateDiffInDays(timestampStart: any, timestampEnd: any) {
    let _MS_PER_DAY = 1000 * 60 * 60 * 24;

    let startDate: Date = new Date(this.getDate(timestampStart, 'diff'));
    let endDate: Date = new Date(this.getDate(timestampEnd, 'diff'));

    const utc1 = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const utc2 = Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  getCarSum(carId:string|undefined):number{
    let sum:number = 0
    this.carsIncome.forEach((_obj: any)=>{
      if(_obj.id == carId) sum = _obj.sum
    })
    return sum
  }

  getCustomerName(cusId:string){
    let res = 'Name Not Found'
   this.customers.forEach((customer:Customer)=>{
    if(customer.id == cusId) res = `${customer.firstName + ' ' + customer.lastName}`
   })
   return res
  }

}
