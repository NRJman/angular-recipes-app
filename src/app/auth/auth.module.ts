import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
