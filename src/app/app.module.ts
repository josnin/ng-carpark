import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
//import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CarparkComponent } from './carpark/carpark.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { FormsModule } from '@angular/forms';


import { CarparkService } from './carpark.service';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    CarparkComponent,
    MyNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule
  ],
  providers: [CarparkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
