import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouting from './routing.serializer';

export const getRoutingState = createFeatureSelector('routing');

export const getRouteSnapshot = createSelector(getRoutingState,
    (routingState: {state: fromRouting.State, navigationId: number}) => {
        return (routingState) ? routingState.state : null;
    }
);

export const getQueryParams = createSelector(getRoutingState,
    (routingState: { state: fromRouting.State, navigationId: number }) => {
        return (routingState) ? routingState.state.queryParams : null;
    }
);
