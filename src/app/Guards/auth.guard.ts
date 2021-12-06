import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {
  }

  async canActivate() {
    try {
      const AuthObj = await this.authService.verifySignature();
      return true;
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }

  async canActivateChild() {
    try {
      const AuthObj = await this.authService.verifySignature();
      return true;
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
