import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'] as string[]; // Récupère le rôle requis à partir des données associées à la route
    for (const role of requiredRole) {
      if (localStorage.getItem(role)) {
        return true;
      }

    }
    if (requiredRole.length > 0) {
      let principal=requiredRole[0]
      console.log(principal);

      if (principal==="client") {
        this.router.navigate(['/sign-in']);
        return false;
      }else if (principal==="manager") {
        this.router.navigate(['/login-manager']);
        return false;
      }else if(principal==="employe"){
        this.router.navigate(['/']);
        return false;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}
