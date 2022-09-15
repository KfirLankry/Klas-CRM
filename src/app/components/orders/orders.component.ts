import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders = [
    {
      customerName: 'Kfir Lankry',
      carManufacture: 'Toyota',
      carModel: 'Corolla',
      rentTime: '5 Days',
      orderDate: '12/9/2022',
      totalPrice: 850,
    },
    {
      customerName: 'Aviv Shleifman',
      carManufacture: 'Mazda',
      carModel: '6',
      rentTime: '2 Days',
      orderDate: '15/9/2022',
      totalPrice: 450,
    },
    {
      customerName: 'Jonathan Nahmias',
      carManufacture: 'Kia',
      carModel: 'Niro',
      rentTime: '7 Days',
      orderDate: '17/9/2022',
      totalPrice: 1250,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
