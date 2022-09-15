import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/Customer';
import { AddCustomerService } from 'src/app/services/add-customer.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  costumers: Customer[] = [];
  constructor(private cs: AddCustomerService) {}

  ngOnInit(): void {
    this.cs.getCustomer().subscribe((customerData: Customer[]) => {
      this.costumers = customerData;
    });
  }
}
