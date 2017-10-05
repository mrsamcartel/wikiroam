import { Component, Input, OnInit } from '@angular/core';

import { WikipageService } from "../services/wikipage.service";
import { Wikipage } from '../models/wikipage.model';
import { Wikilink } from '../models/wikilink.model';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'wikipage',
  templateUrl: './wikipage.component.html',
  styleUrls: ['./wikipage.component.scss']
})
export class WikipageComponent implements OnInit {
    @Input() wikipage: Wikipage;
    fromVisible: boolean;
    fromClass: string;
    wikilinks: Observable <Wikilink[]>;

    constructor(private wikipageService: WikipageService) { }

    ngOnInit() { }

    click(pageid: number): void {
      window.open(
        `https://en.wikipedia.org/?curid=${pageid}`,
        '_blank'
      );
    }

    toggleFrom(): void {
      this.fromVisible = !this.fromVisible;
      this.fromVisible ? this.fromClass = "primary" : this.fromClass = "";
      if (this.fromVisible) {
        this.wikilinks = this.wikipageService.getWikilinksTo(this.wikipage.pageid);
      }
    }
}