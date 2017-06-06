import { Component, OnInit } from '@angular/core';

import { Wikipage } from '../models/wikipage.model';
import { WikipageService } from "../services/wikipage.service";

@Component({
  selector: 'wikipage',
  templateUrl: './wikipage.component.html',
  styleUrls: ['./wikipage.component.css']
})
export class WikipageComponent implements OnInit {
    wikipages: Wikipage[] = [];

    constructor(private wikipageService: WikipageService) { }

    ngOnInit(): void {
        this.wikipageService.getWikipages().subscribe(wikipages => this.wikipages = wikipages);
    }

}
