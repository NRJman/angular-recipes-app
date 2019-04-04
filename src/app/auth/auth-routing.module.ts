import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthTypeResolver } from './auth-type-resolver.service';

const authRoutes: Routes = [
    { path: 'sign/:accessType', component: AuthComponent, resolve: { accessType: AuthTypeResolver } }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }
