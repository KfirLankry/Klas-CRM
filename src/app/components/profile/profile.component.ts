import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private as: AuthService) {}

  ngOnInit(): void {}

  getUserName(): string {
    return this.as.getSessionData('email');
  }
  getUserPic(): string{
    return this.as.getSessionData('profilePic')
  }
}
