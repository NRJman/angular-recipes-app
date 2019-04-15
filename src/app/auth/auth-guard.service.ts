import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<fromApp.State>
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> | Observable<boolean> | boolean {
        const isAuthenticated: Observable<boolean> = this.store.select('auth')
            .pipe(take(2))
            .pipe(map((authState: fromAuth.State) => {
                return authState.isAuthenticated;
            }));

        isAuthenticated.subscribe((isUserAuthenticated: boolean) => {
            if (!isUserAuthenticated) {
                this.router.navigate(['/sign', 'in'], {
                    'queryParams': {
                        'getBackTo': state.url
                    }
                });
            }
        });

        return isAuthenticated;
    }
}
