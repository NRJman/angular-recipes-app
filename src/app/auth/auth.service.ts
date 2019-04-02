import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private jwt: string = '';

    createUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                console.log(error);

                // To remember jwt right after the registration
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => {
                        this.jwt = token;
                    });
            });
    }

    loginUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log('Sign in response:', response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getToken(): string {
        firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
                this.jwt = token;
            });

        return this.jwt;
    }
}