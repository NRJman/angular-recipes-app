import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from '../home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

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
    providers: []
})
export class CoreModule { }
