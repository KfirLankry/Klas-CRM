import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/interfaces/Car';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { CarsService } from 'src/app/services/cars.service';
import { ordersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  order:Order = {start:new Date(),end:new Date(),car_id:'',customer_id:'',sum:0,notes:''}

  cars: Car[] = []
  customers: Customer[] = []

  constructor(private carS:CarsService, private cusS:AddCustomerService, private os:ordersService, private modal:NgbModal) { }

  ngOnInit(): void {
    this.cusS.getCustomer().subscribe((data)=>{
      this.customers = data
    })
    this.carS.getAll().subscribe((data)=>{
      this.cars = data
    })
  }

  calcOrderSum(startDate:Date, endDate:Date, price:number){
    let _MS_PER_DAY = 1000*60*60*24

    // console.log(startDate.getUTCFullYear());
    if(!startDate) return ''
    if(!price) return 0

    let modStartDate = new Date(startDate)
    let modEndDate = new Date(endDate)

    let utc1 = Date.UTC(modStartDate.getFullYear(), modStartDate.getMonth(), modStartDate.getDate());
    let utc2 = Date.UTC(modEndDate.getFullYear(), modEndDate.getMonth(), modEndDate.getDate());

    let sum = (Math.floor((utc2 - utc1) / _MS_PER_DAY))*price
    if(sum == 0) return price
    // this.order.sum = sum
    return sum
  }

  getCarPriceById(ID:string){
    let price:number = 0
    this.cars.forEach((car)=>{
      if(car.id == ID) price = car.price
    })
    return price
  }

  onSubmit(){
    this.order.sum = this.calcOrderSum(this.order.start,this.order.end,this.getCarPriceById(this.order.car_id)) as number
    this.order.start = new Date(this.order.start)
    this.order.end = new Date(this.order.end)
    this.os.addOrder(this.order)
    this.modal.dismissAll()
  }

}
