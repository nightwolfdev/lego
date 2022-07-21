import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { LoadingModule } from './shared/components/loading/loading.module';
import { SearchItemModule } from './shared/components/search-item/search-item.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

import { RequestInterceptor } from './shared/request-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoadingModule,
    ReactiveFormsModule,
    SearchItemModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
