import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/interfaces/Car';
import { Order } from 'src/app/interfaces/Order';
import { AuthService } from 'src/app/services/auth.service';
import { CarsService } from 'src/app/services/cars.service';
import { ordersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private as: AuthService, private router: Router, private oS:ordersService, private carS:CarsService) {}

  cars:Car[] = []
  orders: Order[] = []
  activeOrders:Order[] = []
  activeCars: string[] = []
  message = ''

  ngOnInit(): void {
    this.oS.getAll().subscribe((data)=>{
      this.orders = data
      this.getActiveOrders()
    })
    this.carS.getAll().subscribe((data)=>{
      this.cars = data
      this.getActiveCarNames()
    })
  }

  getUserName(): string {
    return this.as.getSessionData('email');
  }

  logout(): void {
    this.as
      .logout()
      .then(() => {
        this.as.setSessionData('isLoggedIn', 'false');
        this.router.navigateByUrl('login');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getActiveCarNames(){
    this.message = ''
    this.activeCars = []

   this.activeOrders.forEach((order)=>{
      this.cars.forEach((car:Car)=>{
        if(car.id==order.car_id){
          this.activeCars.push(`${car.manufacture} ${car.model}`)
        }
      })
    })

  
    this.message += 'Active Cars: '

    this.activeCars.forEach((carName)=>{
      this.message += `${carName}, `
    })
    
  }


  getActiveOrders(){
    this.activeOrders = []

    this.orders.forEach((order)=>{
      if(this.isActive(order.end, order.start)){
        this.activeOrders.push(order)
      }
    })

  }

  isActive(timestamp1:any, timestamp2:any) {
    let today = new Date()
    today.setHours(0, 0, 0, 0)

    if(timestamp2 == '') return (new Date(timestamp1.seconds*1000) > today)

    return (new Date(timestamp1.seconds*1000) > today && new Date(timestamp2.seconds*1000) <= today)
  }
}
