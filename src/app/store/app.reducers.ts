import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducers';
import * as fromAuth from 'src/app/auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
};
