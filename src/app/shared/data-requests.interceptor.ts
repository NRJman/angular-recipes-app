import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducers';
import { switchMap } from 'rxjs/operators';
import { getAuthToken } from '../auth/store/auth.selectors';

@Injectable()
export class DataRequestsInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.State>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(getAuthToken).pipe(switchMap((token: string) => {
            const modifiedRequest = request.clone({
                params: request.params.set('auth', token)
            });

            return next.handle(modifiedRequest);
        }));
    }
}
