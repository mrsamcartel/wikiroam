import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material';

import { WikipageService } from './services/wikipage.service';

import { AppComponent } from './app.component';
import { WikipageComponent } from './wikipage/wikipage.component';

@NgModule({
  declarations: [
    AppComponent,
    WikipageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [WikipageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
