import { Component, Input, OnInit } from '@angular/core';

import { Wikipage } from '../models/wikipage.model';

@Component({
  selector: 'wikipage',
  templateUrl: './wikipage.component.html',
  styleUrls: ['./wikipage.component.scss']
})
export class WikipageComponent implements OnInit {
    @Input() wikipage: Wikipage;

    constructor() { }

    ngOnInit() { }

    click(pageid: number) {
      window.open(
      `https://en.wikipedia.org/?curid=${pageid}`,
      '_blank'
    );
    }
}