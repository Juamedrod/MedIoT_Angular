import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate() {
    try {
      const AuthObj = await this.authService.verifySignature();
      this.router.navigate(['/dashboard']);
      return false;
    } catch (error) {
      return true;
    }
  }

}
