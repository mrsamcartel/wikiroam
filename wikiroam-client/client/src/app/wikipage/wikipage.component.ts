import { Component, Input, OnInit } from '@angular/core';

import { Wikipage } from '../models/wikipage.model';

@Component({
  selector: 'wikipage',
  templateUrl: './wikipage.component.html',
  styleUrls: ['./wikipage.component.css']
})
export class WikipageComponent implements OnInit {
    @Input() wikipage: Wikipage;

    constructor() { }

    ngOnInit() { }
}