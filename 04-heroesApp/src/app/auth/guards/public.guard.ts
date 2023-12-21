import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const publicGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.checkAuthentication()
        .pipe(
            tap(isAuthenticated => {
                if (isAuthenticated) 
                    router.navigate(['/']);
            }),
            map(
                isAuthenticated => !isAuthenticated
            )
        )
}