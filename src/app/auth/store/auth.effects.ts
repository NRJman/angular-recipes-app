import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromAuthActions from './auth.actions';
import { map, switchMap, tap, catchError, withLatestFrom } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from, of } from 'rxjs';
import { Router } from '@angular/router';
import * as fromApp from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { getRoutingState, getRouteSnapshot, getQueryParams } from 'src/app/routing/store/routing.selectors';
import * as fromRouting from './../../routing/store/routing.serializer';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private router: Router, private store$: Store<fromApp.State>) { }

    @Effect()
    signUp$ = this.actions$.pipe(
        ofType(fromAuthActions.START_SIGN_UP),
        withLatestFrom(this.store$.select(getQueryParams)),
        map(([action, queryParams]: [fromAuthActions.StartSignUp, object]) => {
            return [action.payload, queryParams];
        }),
        switchMap(([formData, queryParams]: [fromAuthActions.FormData, object]) => {
            return from(firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)).pipe(
                switchMap(() => {
                    return from(firebase.auth().currentUser.getIdToken());
                }),
                switchMap((token: string) => {
                    const urlToGetBack = (<{getBackTo: string}>queryParams).getBackTo;

                    return [
                        {
                            type: fromAuthActions.SET_TOKEN,
                            payload: token
                        },
                        {
                            type: fromAuthActions.SIGN_UP
                        },
                        {
                            type: fromAuthActions.NAVIGATE,
                            payload: (urlToGetBack) ? urlToGetBack : '/'
                        }
                    ];
                }),
                catchError((error) => {
                    return of({
                        type: fromAuthActions.FAIL_AUTH,
                        payload: error
                    });
                })
            );
        })
    );

    @Effect({
        dispatch: false
    })
    navigate$ = this.actions$.pipe(
        ofType(fromAuthActions.NAVIGATE),
        map((action: fromAuthActions.FailAuth) => {
            return action.payload;
        }),
        tap((url: string) => {
            this.router.navigate([url]);
        })
    );

    @Effect({
        dispatch: false
    })
    failAuth$ = this.actions$.pipe(
        ofType(fromAuthActions.FAIL_AUTH),
        tap((error) => {
            console.log(error);
        })
    );

    @Effect()
    signIn$ = this.actions$.pipe(
        ofType(fromAuthActions.START_SIGN_IN),
        map((action: fromAuthActions.StartSignIn) => {
            return action.payload;
        }),
        switchMap((formData: fromAuthActions.FormData) => {
            return from(firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)).pipe(
                switchMap(() => {
                    return firebase.auth().currentUser.getIdToken()
                }),
                switchMap((token: string) => {
                    return [
                        {
                            type: fromAuthActions.SET_TOKEN,
                            payload: token
                        },
                        {
                            type: fromAuthActions.SIGN_IN
                        },
                        {
                            type: fromAuthActions.NAVIGATE,
                            payload: 'recipe-book'
                        }
                    ];
                }),
                catchError((error) => {
                    return of({
                        type: fromAuthActions.FAIL_AUTH,
                        payload: error
                    });
                })
            );
        }),
    );

    @Effect()
    signOut$ = this.actions$.pipe(
        ofType(fromAuthActions.START_SIGN_OUT),
        switchMap(() => {
            return from(firebase.auth().signOut()).pipe(
                switchMap(() => {
                    return [
                        {
                            type: fromAuthActions.SIGN_OUT
                        },
                        {
                            type: fromAuthActions.NAVIGATE,
                            payload: 'recipe-book'
                        }
                    ];
                }),
                catchError((error) => {
                    return of({
                        type: fromAuthActions.FAIL_AUTH,
                        payload: error
                    });
                })
            );
        })
    );
}
