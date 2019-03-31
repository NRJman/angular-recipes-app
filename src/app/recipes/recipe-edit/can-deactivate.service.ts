import { Observable } from "rxjs";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

export interface CanComponentDeactivate {
    canDeactivate: () => Promise<boolean> | Observable<boolean> | boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(
        component: CanComponentDeactivate,
        activatedRoute: ActivatedRouteSnapshot,
        activatedState: RouterStateSnapshot,
        nextState: RouterStateSnapshot,
    ): Promise<boolean> | Observable<boolean> | boolean {
        return component.canDeactivate();
    }
}
