import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Wikipage } from '../models/wikipage.model';

import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class WikipageService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  private apiUrl = 'https://3xg1u0qubd.execute-api.us-east-1.amazonaws.com/dev/wikipages'; // URL to web api

  constructor(private http: HttpClient) {}

  getWikipages(): Observable < Wikipage[] > {
    return this.http.get(this.apiUrl);
  };

  searchWikipages(word): Observable < Wikipage[] > {
    let keyword = word;
    if (!keyword) {
      return this.http.get(this.apiUrl + "/search/keyword/test");
    } else {
      return this.http.get(this.apiUrl + "/search/keyword/" + keyword);
    }
  };
}



