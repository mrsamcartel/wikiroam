import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatInputModule } from '@angular/material';

import { WikipageService } from './services/wikipage.service';

import { AppComponent } from './app.component';
import { WikipageComponent } from './wikipage/wikipage.component';
import { WikipageSearchComponent } from './wikipage-search/wikipage-search.component';

@NgModule({
  declarations: [
    AppComponent,
    WikipageComponent,
    WikipageSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [WikipageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
