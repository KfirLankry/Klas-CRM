import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pnf',
  templateUrl: './pnf.component.html',
  styleUrls: ['./pnf.component.css'],
})
export class PnfComponent implements OnInit {
  constructor(private _location: Location) {}

  ngOnInit(): void {}
  goBack() {
    this._location.back();
  }
}
