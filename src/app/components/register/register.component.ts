import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = { email: '', password: '' };
  constructor(
    private as: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  submitRegister() {
    this.as
      .register(this.user)
      .then((data) => {
        this.as.setSessionData('email', data.user.email as string);
        this.as.setSessionData('isLoggedIn', 'true');
        this.as.setSessionData('profilePic', '../../../assets/img/149071.png')
        this.router.navigateByUrl('dashboard/customers');
        this.toastr.success('Registration went Successfuly!', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 3000,
        });
      })
      .catch(() => {
        this.toastr.success('Email or password are already in use!', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 1800,
        });
      });
  }
}
