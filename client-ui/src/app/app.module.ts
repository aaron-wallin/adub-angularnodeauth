import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DealService } from '../app/deals-feature/deal.service';
import { PublicDealsComponent } from './deals-feature/public-deals/public-deals.component';
import { PrivateDealsComponent } from './deals-feature/private-deals/private-deals.component';
import { CallbackComponent } from './app-feature/callback.component';
import { AuthService } from './auth-feature/auth.service';
import { LaunchDarklyService } from './app-feature/launchdarkly.service';

@NgModule({
  declarations: [
    AppComponent,
    PublicDealsComponent,
    PrivateDealsComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DealService,
    AuthService,
    LaunchDarklyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
