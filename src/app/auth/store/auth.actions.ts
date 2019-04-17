import { Action } from '@ngrx/store';

export interface FormData {
    email: string;
    password: string;
}

export const
    START_SIGN_UP = 'START_SIGN_UP',
    SIGN_UP = 'SIGN_UP',
    START_SIGN_IN = 'START_SIGN_IN',
    SIGN_IN = 'SIGN_IN',
    START_SIGN_OUT = 'START_SIGN_OUT',
    SIGN_OUT = 'SIGN_OUT',
    SET_TOKEN = 'SET_TOKEN',
    NAVIGATE = 'NAVIGATE',
    FAIL_AUTH = 'FAIL_AUTH';

export class StartSignUp implements Action {
    readonly type = START_SIGN_UP;
    constructor(public payload: FormData) { }
}

export class SignUp implements Action {
    readonly type = SIGN_UP;
}

export class StartSignIn implements Action {
    readonly type = START_SIGN_IN;
    constructor(public payload: FormData) { }
}

export class SignIn implements Action {
    readonly type = SIGN_IN;
}

export class StartSignOut implements Action {
    readonly type = START_SIGN_OUT;
}

export class SignOut implements Action {
    readonly type = SIGN_OUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: string) { }
}

export class Navigate implements Action {
    readonly type = NAVIGATE;
    constructor(public payload: string) { }
}

export class FailAuth implements Action {
    readonly type = FAIL_AUTH;
    constructor(public payload: string) { }
}

export type AuthActions =
    StartSignUp |
    SignUp |
    StartSignIn |
    SignIn |
    StartSignOut |
    SignOut |
    SetToken;
