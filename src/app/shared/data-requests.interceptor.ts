import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class DataRequestsInterceptor implements HttpInterceptor {
    public authState: Observable<fromAuth.State> = this.store.select('auth');

    constructor(private store: Store<fromApp.State>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let modifiedRequest: HttpRequest<any>;

        this.authState.subscribe((authState: fromAuth.State) => {
            modifiedRequest = request.clone({
                params: request.params.set('auth', authState.token)
            });
        });

        return next.handle(modifiedRequest);
    }
}
