import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
    { path: '', redirectTo: 'recipe-book', pathMatch: 'full' },
    { path: 'page-not-found', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
