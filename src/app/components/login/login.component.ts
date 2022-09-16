import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = { email: '', password: '' };

  constructor(
    private as: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  // Login with Email and Password
  submitLogin(): void {
    this.as
      .login(this.user)
      .then((data) => {
        this.toastr.success('You Are Logged In!', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 3000,
        });
        this.as.setSessionData('email', data.user.email as string);
        this.as.setSessionData('isLoggedIn', 'true');
        this.router.navigateByUrl('dashboard/reports');
      })
      .catch(() => {
        this.toastr.error('Email or Password are Incorrect!, Try Again.', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 3000,
        });
      });
  }

  loginWithGoogle(): void {
    this.as
      .loginWithGoogle()
      .then((data) => {
        this.toastr.success('You Are Logged In!', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 3000,
        });
        this.as.setSessionData('email', data.user.displayName as string);
        this.as.setSessionData('isLoggedIn', 'true');
        this.router.navigateByUrl('dashboard/reports');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
