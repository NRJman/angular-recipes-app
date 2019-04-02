import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private jwt: string;

    createUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                // To remember jwt right after the registration
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => {
                        this.jwt = token;
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    loginUser(email: string, password: string): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log('Sign in response:', response);

                // To remember jwt right after the authorization
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => {
                        this.jwt = token;
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
            .catch((error) => {
                console.log(error);
            });

        this.jwt = null;
    }

    getToken(): string {
        firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
                this.jwt = token;
            });

        return this.jwt;
    }

    isUserAuthenticated(): boolean {
        return this.jwt != null;
    }
}
