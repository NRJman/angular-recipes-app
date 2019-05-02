import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducers';

export const getAuthState = createFeatureSelector('auth');

export const getAuthToken = createSelector(getAuthState, (authState: fromAuth.State) => {
    return authState.token;
});
