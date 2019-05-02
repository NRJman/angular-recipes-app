import { Params, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';

export interface State {
    url: string;
    queryParams: Params;
    params: Params;
}

export class CustomSerializer implements fromRouter.RouterStateSerializer<State> {
    serialize(routerState: RouterStateSnapshot): State {
        const { url } = routerState;
        const { queryParams } = routerState.root;

        let routeSnapshot: ActivatedRouteSnapshot = routerState.root;

        while (routeSnapshot.firstChild) {
            routeSnapshot = routeSnapshot.firstChild;
        }

        const { params } = routeSnapshot;

        return { url, queryParams, params };
    }
}
