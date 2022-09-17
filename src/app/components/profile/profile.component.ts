import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private as: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.as.getSessionData('pic'));
  }

  getUserName(): string {
    return this.as.getSessionData('email');
  }

  getUserPic(): string {
    return this.as.getSessionData('profilePic');
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
}
