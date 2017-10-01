import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Wikipage } from '../models/wikipage.model';

import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WikipageService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'https://3xg1u0qubd.execute-api.us-east-1.amazonaws.com/dev/wikipages';  // URL to web api

  constructor(private http: Http) { }

  getWikipages(): Observable<Wikipage[]> {
    return this.http.get(this.apiUrl)
               .map((res: Response) => {
                 return res.json().wikipages as Wikipage[];
               })
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchWikipages(word:String): Observable<Wikipage[]> {
    return this.http.get(`${this.apiUrl}/search/${word}`)
               .map((res: Response) => {
                 return res.json().wikipages as Wikipage[];
               })
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}