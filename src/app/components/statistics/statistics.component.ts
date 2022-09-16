import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { ordersService } from 'src/app/services/orders.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  costumers: Customer[] = [];
  thisMonthCustomers:Customer[] = []
  orders: Order[] = []

  thisMonthOrders:Order[] = []
  activeOrders:Order[] = []
  totalRevenue:number = 0

  constructor(private cs: AddCustomerService, private sS:StatsService, private oS:ordersService) {}


  ngOnInit(): void {
    this.cs.getCustomer().subscribe((customerData: Customer[]) => {
      this.costumers = customerData;
      this.getCustomersThisMonth()
    });
    this.oS.getAll().subscribe((data)=>{
      this.orders = data
      this.getTotalRevenue()
      this.getRevenueThisMonth()
      this.getActiveOrders()
    })
  }

  getTotalRevenue(){
    this.totalRevenue = 0
    this.orders.forEach((order)=>{
      this.totalRevenue += order.sum as number
    })
  }

  getRevenueThisMonth(){
    this.thisMonthOrders = []
    this.orders.forEach((order)=>{

      if(this.getDate(order.end, 'month') == new Date().getMonth() as unknown as string) this.thisMonthOrders.push(order)
    })

    let sum = 0

    this.thisMonthOrders.forEach((order)=>{
      sum += order.sum
    })
    
    return sum
  }

  getActiveOrders(){
    this.activeOrders = []

    this.orders.forEach((order)=>{
      if(this.isActive(order.end, order.start)) this.activeOrders.push(order)
    })
    
  }


  getDate(timestamp:any, type:string):string{
    let months= ["January","February","March","April","May","June","July", "August","September","October","November","December"]

    let day = new Date(timestamp.seconds*1000).getDate()
    let month = new Date(timestamp.seconds*1000).getMonth()
    let year = new Date(timestamp.seconds*1000).getFullYear()

    if(type=='month') return month as unknown as string
    else if(type=='diff') return `${month+1}/${day}/${year}`

    return day<10? `0${day}/${month}/${year}` : `${day}/${month}/${year}`
  }

  isActive(timestamp1:any, timestamp2:any) {

    let today = new Date()
    today.setHours(0, 0, 0, 0)
    // console.log(today + ' $$$ ' + new Date(timestamp1.seconds*1000))

    if(timestamp2 == '') return (new Date(timestamp1.seconds*1000) > today)

    return (new Date(timestamp1.seconds*1000) > today && new Date(timestamp2.seconds*1000) <= today)
  }

  getCustomersThisMonth(){
    this.thisMonthCustomers = []
      this.costumers.forEach((cus)=>{
        if(this.getDate(cus.dateAdded, 'month') == new Date().getMonth() as unknown as string) this.thisMonthCustomers.push(cus)
    })
  }


}
