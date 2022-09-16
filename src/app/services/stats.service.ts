import { Injectable } from '@angular/core';
import { Order } from '../interfaces/Order';
import { AddCustomerService } from './add-customer.service';
import { CarsService } from './cars.service';
import { ordersService } from './orders.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {


  constructor(private cusS:AddCustomerService, private carS:CarsService, private oS:ordersService) {}

  // getTotalRevenue(){
  //   this.oS.getAll().subscribe((data)=>{
  //     let sum = 0
  //     data.forEach((order)=>{
  //       sum += order.sum
  //     })
  //     return sum
  //   })
  // }



}
