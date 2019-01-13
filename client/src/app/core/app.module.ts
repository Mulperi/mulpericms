import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './containers/app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from './../../environments/environment';
import { StoreModule } from '@ngrx/store';

import { reducers, metaReducers } from './store/reducers/index';
import { EffectsModule } from '@ngrx/effects';

import { effects } from './store/effects/index';
import { SharedModule } from '../shared/shared.module';

import { ChangePasswordComponent } from './containers/changepassword/changepassword.component';
import { LoginComponent } from './containers/login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MarkdownModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot({})
  ],
  declarations: [AppComponent, LoginComponent, ChangePasswordComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
