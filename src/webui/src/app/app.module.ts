import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorInterceptor } from './security/authorization.interceptor';
import { JwtInterceptor } from './security/jwt-interceptor';
import { LandComponent } from './land/land.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    RegisterComponent,
    LandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "tr" },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
