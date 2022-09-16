import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/Car';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { CarsService } from 'src/app/services/cars.service';
import { ordersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private oS:ordersService, private carS: CarsService, private cusS:AddCustomerService) { }

  orders:Order[] = []
  cars:Car[] = []
  customers:Customer[] = []

  carsChart:any = {
    cars: [],
    carCount:0,
    label:{
      visible:true,
      position:'Inside',
    },
    legend:{
      visible:true,
      position:'Bottom',
      height:'8%',
      width:'35%'
    },
    tooltip:{
      enable:true,
      format: '<span>${point.x} Ordered ${point.y} Times</span>'
    },
    colorMap: 'color'
  }

  customersChart:any = {
    data: [],
    xAxis : {
      valueType: 'Category',
      title: 'Customer name'
    },
    yAxis : {
      title: 'Order Count',
      interval: 1
    },
    tooltip:{
      enable:true,
      format: '<b>${point.x}</b> Has Made <b>${point.y}</b> Orders'
    },
    colorMap: 'color'
  }


  ngOnInit(): void {
    this.oS.getAll().subscribe((data)=>{
      this.orders = data
    })
    this.carS.getAll().subscribe((data)=>{
      this.cars = data
      this.carsChart.cars = []
      data.forEach((car)=>{
        let amount = 0

        this.orders.forEach((order)=>{
          if(order.car_id==car.id) 
          amount++
        })
        this.carsChart.cars.push({name:`${car.manufacture} ${car.model}`,amount:amount})
      })
    })
    this.cusS.getCustomer().subscribe((data)=>{
      this.customers = data
      this.customersChart.data = []
      data.forEach((cus)=>{
      let amount = 0
      this.orders.forEach((order)=>{
          if(order.customer_id==cus.id) amount++
        })
        this.customersChart.data.push({name:`${cus.firstName} ${cus.lastName}`, orderCount:amount, color:'#344354'})
      })
    })


  }

}
