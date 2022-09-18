import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/Car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  @Input() id?: string;
  carArr: Car[] = [];
  car: Car = {
    manufacture: '',
    model: '',
    year: 0,
    price: 0,
    seats: 0,
    cargo: '',
    doors: 0,
    picUrl: '',
  };

  constructor(private carS: CarsService) {}

  ngOnInit(): void {
    if (this.id) {
      this.carS.getCarById(this.id).subscribe((carData: Car) => {
        this.car = carData;
        console.log(this.car.year);
      });
    }
  }
}
