import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { getAuthState } from './store/auth.selectors';

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
        const isAuthenticated: Observable<fromAuth.State> = <Observable<fromAuth.State>>this.store.select(getAuthState);

        return isAuthenticated.pipe(switchMap((authState: fromAuth.State) => {
            if (!authState.isAuthenticated) {
                this.router.navigate(['/sign', 'in'], {
                    'queryParams': {
                        'getBackTo': state.url
                    }
                });
            }

            return of(authState.isAuthenticated);
        }));
    }
}
