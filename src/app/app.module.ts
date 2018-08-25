import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CarparkComponent } from './carpark/carpark.component';
import { CarparkSearchComponent } from './carpark-search/carpark-search.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CarparkService } from './carpark.service';
import { CarparkNavComponent } from './carpark-nav/carpark-nav.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    CarparkComponent,
    CarparkNavComponent,
    CarparkSearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CarparkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
