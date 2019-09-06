import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RequestComponent } from './request/request.component';
import { requestReducer } from './reducers/request.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RequestService } from './services/request.service';
import { RequestEffects } from './effects/request.effects';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    RequestComponent
  ],
  imports: [
    StoreModule.forRoot({
      crudRequests : requestReducer
    }),
    EffectsModule.forRoot([
      RequestEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    HttpClientModule,
    BrowserModule
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
