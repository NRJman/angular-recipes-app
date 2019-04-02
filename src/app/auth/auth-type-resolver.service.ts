import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthTypeResolver implements Resolve<Promise<boolean> | Observable<boolean> | boolean> {
    resolve(activeRoute: ActivatedRouteSnapshot, activeState: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
        return activeRoute.params['accessType'];
    }
}