import * as fromAuthActions from './auth.actions';

export interface State {
    isAuthenticated: boolean;
    token: string;
}

const initialState: State = {
    isAuthenticated: false,
    token: null
};

export function authReducer(state: State = initialState, action: fromAuthActions.AuthActions ) {
    switch (action.type) {
        case fromAuthActions.SIGN_UP:
        case fromAuthActions.SIGN_IN:
            return {
                ...state,
                isAuthenticated: true
            };
        case fromAuthActions.SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null
            };
        case fromAuthActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}
