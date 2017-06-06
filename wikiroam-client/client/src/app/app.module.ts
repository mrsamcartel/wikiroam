import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

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
    HttpModule
  ],
  providers: [WikipageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
