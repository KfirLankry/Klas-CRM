import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/interfaces/Car';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { CarsService } from 'src/app/services/cars.service';
import { ordersService } from 'src/app/services/orders.service';
import { AddOrderComponent } from '../add-order/add-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  pastOrders:Order[] = []
  activeOrders:Order[] = []
  futureOrders:Order[] = []

  customers:Customer[] = []
  cars:Car[] = []

  constructor(private os:ordersService, private cusS: AddCustomerService, private carS:CarsService, private router:Router, private modal:NgbModal) {}

  ngOnInit(): void {
    this.os.getAll().subscribe((data:Order[])=>{
      this.pastOrders = []
      this.activeOrders = []
      this.futureOrders = []
      data.forEach((order)=>{
        let today:Date = new Date()
        let startDate:Date = new Date(this.getDate(order.start, 'diff'))
        let endDate:Date = new Date(this.getDate(order.end, 'diff'))
        if(startDate<today && endDate<today) this.pastOrders.push(order)
        else if(startDate<today && endDate>today) this.activeOrders.push(order)
        else this.futureOrders.push(order)
      })
    })
    this.cusS.getCustomer().subscribe((data)=>{
      this.customers = data
    })
    this.carS.getAll().subscribe((data)=>{
      this.cars = data
    })
  }

  getDate(timestamp:any, type:string):string{
    let months= ["January","February","March","April","May","June","July", "August","September","October","November","December"]

    let day = new Date(timestamp.seconds*1000).getDate()
    let month = new Date(timestamp.seconds*1000).getMonth()
    let year = new Date(timestamp.seconds*1000).getFullYear()

    if(type=='diff') return `${month+1}/${day}/${year}`

    return day<10? `0${day}/${month+1}/${year}` : `${day}/${month+1}/${year}`
  }

  dateDiffInDays(timestampStart:any, timestampEnd:any) {
    let _MS_PER_DAY = 1000*60*60*24

    let startDate:Date = new Date(this.getDate(timestampStart, 'diff'))
    let endDate:Date = new Date(this.getDate(timestampEnd, 'diff'))

    
    const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  getCustomerById(ID:string){
    if(!this.customers.length) return ''
    let match = this.customers.filter((cus)=>{
      return cus.id == ID
    })
    return `${match[0].firstName} ${match[0].lastName}`
  }


  getCarById(ID:string):Car|any{
    if(!this.cars.length) return {}
    let match = this.cars.filter((car)=> car.id == ID)
    return match[0]
  }

  navToCustomerDetails(ID:string){
    this.router.navigateByUrl(`/dashboard/customers/${ID}`)
  }


  addNewOrder() {
    const modalRef = this.modal.open(AddOrderComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
  }



}
