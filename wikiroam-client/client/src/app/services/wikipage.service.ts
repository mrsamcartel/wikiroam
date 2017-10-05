import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Wikipage } from '../models/wikipage.model';
import { Wikilink } from '../models/wikilink.model';

import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class WikipageService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private apiUrl: string;

  // private apiUrl for dev = 'https://y3ronmcw0a.execute-api.us-east-1.amazonaws.com/dev/wikipages';
  // private apiUrl for www = 'https://1z458bgqbd.execute-api.us-east-1.amazonaws.com/dev/wikipages';
  constructor(private http: HttpClient) {
    if(isDevMode()) {
      this.apiUrl = 'https://y3ronmcw0a.execute-api.us-east-1.amazonaws.com/dev/wikipages';
    } else {
      this.apiUrl = 'https://1z458bgqbd.execute-api.us-east-1.amazonaws.com/www/wikipages';
    }
  }

  getWikipages(): Observable < Wikipage[] > {
    // return this.http.get(this.apiUrl);
    return this.searchWikipages('schoelcher');
  };

  searchWikipages(word): Observable < Wikipage[] > {
    if (!word) {
      return this.http.get(this.apiUrl + "/search/keyword/test");
    } else {
      return this.http.get(this.apiUrl + "/search/keyword/" + word);
    }
  };

  getWikilinksTo(toid: number): Observable < Wikilink[] > {
    return this.http.get(this.apiUrl + '/' + toid + '/backlinks');
  };
}



