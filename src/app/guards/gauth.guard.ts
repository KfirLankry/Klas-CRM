import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GauthGuard implements CanActivate {
  constructor(private as: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.as.getSessionData('isLoggedIn') == 'true') return true;
    else {
      // If not, it navigates to Login page and return false
      alert('Youre not allowed to access this url');
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
