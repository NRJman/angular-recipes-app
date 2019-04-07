import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from '../home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataRequestsInterceptor } from '../shared/data-requests.interceptor';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        PageNotFoundComponent
    ],
    imports: [
        AppRoutingModule,
        SharedModule
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: DataRequestsInterceptor, multi: true }
    ]
})
export class CoreModule { }
