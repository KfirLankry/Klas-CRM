import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pnf',
  templateUrl: './pnf.component.html',
  styleUrls: ['./pnf.component.css'],
})
export class PnfComponent implements OnInit {
  constructor(private _location: Location, private router: Router) {}

  ngOnInit(): void {}
  goBack() {
    this.router.navigateByUrl('dashboard/reports');
  }
}
