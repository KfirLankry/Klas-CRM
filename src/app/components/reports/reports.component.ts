import { Component, OnInit } from '@angular/core';
import {
  IAccTextRenderEventArgs,
  IPointRenderEventArgs,
} from '@syncfusion/ej2-charts';
import { Car } from 'src/app/interfaces/Car';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { AddCustomerService } from 'src/app/services/add-customer.service';
import { CarsService } from 'src/app/services/cars.service';
import { ordersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  constructor(
    private oS: ordersService,
    private carS: CarsService,
    private cusS: AddCustomerService
  ) {}

  orders: Order[] = [];
  cars: Car[] = [];
  customers: Customer[] = [];

  chartPallete:string[] = [
    '#254469',
    '#4C5F75',
    '#5E7691',
    '#1D3552',
    '#3C70AB',
    '#294D75',
    '#4B5D73',
    '#6C799E',
    '#304680',
    '#586482',
    '#5F6D94'
  ]

  carsChart: any = {
    cars: [],
    carCount: 0,
    label: {
      visible: true,
      position: 'Outside',
      template:
        '<div class="text-center text-dark"><div>${point.x}</div><div>${point.y} Orders</div></div>'
    },
    legend: {
      visible: true,
      position: 'Bottom',
      height: '8%',
      width: '100%',
    },
    tooltip: {
      enable: true,
      format: '<span>${point.x} Ordered ${point.y} Times</span>',
    },
    colorMap: 'color'
  };

  carsIncomeChart: any = {
    cars: [],
    carCount: 0,
    label: {
      visible: true,
      position: 'Outside',
      name: 'sum',
      template:
        '<div class="text-center text-dark"><div>${point.x}</div><div>${point.y}$</div></div>',
    },
    enableSmartLabels: true,
    legend: {
      visible: true,
      position: 'Bottom',
      height: '8%',
      width: '100%',
    },
    tooltip: {
      enable: true,
      format: '<span>${point.x} Has Made ${point.y}$ in Revenues</span>',
    },
    colorMap: 'color'
  };

  customersChart: any = {
    data: [],
    xAxis: {
      valueType: 'Category',
      title: 'Customer name',
    },
    yAxis: {
      title: 'Order Count',
      interval: 1,
    },
    tooltip: {
      enable: true,
      format: '<b>${point.x}</b> Has Made <b>${point.y}</b> Orders',
    },
    palletes: [
      '#254469',
      '#4C5F75',
      '#5E7691',
      '#1D3552',
      '#3C70AB',
      '#294D75',
      '#4B5D73',
      '#6C799E',
      '#304680',
      '#586482',
      '#5F6D94'
    ],
    cornerRadius: {
      topLeft: 10,
      topRight: 10,
    },
  };

  onTextRender(args: IAccTextRenderEventArgs) {
    // args.color = 'red';
  }
  pointRender(args: IPointRenderEventArgs): void {
    args.fill = this.customersChart.palletes[args.point.index];
  }

  ngOnInit(): void {
    this.oS.getAll().subscribe((data) => {
      this.orders = data;
    });
    this.carS.getAll().subscribe((data) => {
      this.cars = data;
      this.carsChart.cars = [];
      this.carsIncomeChart.cars = [];
      data.forEach((car) => {
        let amount = 0;

        let incomeSum = 0;

        this.orders.forEach((order) => {
          if (order.car_id == car.id) {
            amount++;
            incomeSum += order.sum;
          }
        });
        this.carsChart.cars.push({
          name: `${car.manufacture} ${car.model}`,
          amount: amount,
        });
        this.carsIncomeChart.cars.push({
          name: `${car.manufacture} ${car.model}`,
          sum: incomeSum,
        });
      });
    });
    this.cusS.getCustomer().subscribe((data) => {
      this.customers = data;
      this.customersChart.data = [];
      data.forEach((cus) => {
        let amount = 0;
        this.orders.forEach((order) => {
          if (order.customer_id == cus.id) amount++;
        });
        this.customersChart.data.push({
          name: `${cus.firstName} ${cus.lastName}`,
          orderCount: amount,
          color: '#344354',
        });
      });
    });
  }
}
