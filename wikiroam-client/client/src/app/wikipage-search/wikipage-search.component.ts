import { Component, OnInit } from '@angular/core';

import { Wikipage } from '../models/wikipage.model';
import { WikipageService } from "../services/wikipage.service";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'wikipage-search',
  templateUrl: './wikipage-search.component.html',
  styleUrls: ['./wikipage-search.component.css']
})
export class WikipageSearchComponent implements OnInit {
    private searchTerms = new Subject<string>();
    wikipages: Observable <Wikipage[]>;

    constructor(private wikipageService: WikipageService) { }

    ngOnInit(): void {
        this.wikipages = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => this.wikipageService.searchWikipages(term));
        }

    search(term: string): void {
        this.searchTerms.next(term);
    }

}
