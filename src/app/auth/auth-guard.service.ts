import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> | Observable<boolean> | boolean {
        const isUserAuthenticated: boolean = this.authService.isUserAuthenticated();

        if (!isUserAuthenticated) {
            this.router.navigate(['/sign', 'in'], {
                'queryParams': {
                    'getBackTo': state.url
                }
            });
        }

        return this.authService.isUserAuthenticated();
    }
}
