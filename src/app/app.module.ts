import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { RecipesService } from './recipes/recipes.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RecipesModule,
    SharedModule,
    AuthModule,
    ShoppingListModule,
    AppRoutingModule
  ],
  providers: [
    RecipesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
