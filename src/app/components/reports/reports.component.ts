import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/Car';
import { Order } from 'src/app/interfaces/Order';
import { CarsService } from 'src/app/services/cars.service';
import { ordersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private oS:ordersService, private carS: CarsService) { }

  orders:Order[] = []
  cars:Car[] = []

  carsChart:any = {
    cars: [],
    carCount:0,
    names: [],
    label:{
      visible:true,
      position:'Inside',
      name:'status'
    },
    legend:{
      visible:true,
      position:'Bottom',
      height:'8%',
      width:'35%'
    },
    tooltip:{
      enable:true,
      format: '<b>${point.x} Ordered ${point.y} Times</b>'
    },
    colorMap: 'color'
  }

  ngOnInit(): void {
    this.oS.getAll().subscribe((data)=>{
      this.orders = data
    })
    this.carS.getAll().subscribe((data)=>{
      // this.carsChart.names = []
      this.cars = data
      this.carsChart.cars = []

      data.forEach((car)=>{
        // let name = car.manufacture + ' ' + car.model
        // this.carsChart.name.push(name)
        let amount = 0

        this.orders.forEach((order)=>{
          if(order.car_id==car.id) 
          amount++
        })
        this.carsChart.cars.push({name:`${car.manufacture} ${car.model}`,amount:amount})
        
      })
    })


  }

}
