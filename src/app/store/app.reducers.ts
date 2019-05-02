import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducers';
import * as fromAuth from 'src/app/auth/store/auth.reducers';
import * as fromRouting from 'src/app/routing/store/routing.serializer';
import { ActionReducerMap } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface State {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    routing: RouterReducerState<fromRouting.State>;
}

export const reducers: ActionReducerMap<State> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    routing: routerReducer
};
