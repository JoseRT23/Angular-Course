import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

export const checkAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if(!isAuthenticated) {
          router.navigate(['/auth/login']);
        }
      })
    )
}

export const authCanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if(!isAuthenticated) {
          router.navigateByUrl('/auth/login');
        }
      })
    )
}

export const authCanMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if(!isAuthenticated) {
          router.navigateByUrl('/auth/login');
        }
      })
    )
}