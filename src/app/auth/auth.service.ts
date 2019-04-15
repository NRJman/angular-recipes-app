import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducers';
import * as fromAuthActions from './store/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private store: Store<fromApp.State>) { }

    createUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                this.store.dispatch(new fromAuthActions.SignUp());

                // To remember jwt right after the registration
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => {
                        this.store.dispatch(new fromAuthActions.SetToken(token));
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    loginUser(email: string, password: string): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.store.dispatch(new fromAuthActions.SignIn());

                // To remember jwt right after the authorization
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => {
                        this.store.dispatch(new fromAuthActions.SetToken(token));
                    });

                return new Promise((resolve, reject) => {
                    resolve();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    logoutUser(): void {
        firebase.auth().signOut()
            .then(() => {
                this.store.dispatch(new fromAuthActions.SignOut());
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
