import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';

import { Minifig, SearchResult } from '../../shared/interfaces';
import { MinifigsService } from '../minifigs.service';

@Component({
  selector: 'app-view-minifig',
  templateUrl: './view-minifig.component.html',
  styleUrls: ['./view-minifig.component.scss']
})
export class ViewMinifigComponent implements OnInit {
  minifig$: Observable<Minifig>;
  minifigParts$: Observable<SearchResult[]>;
  minifigSets$: Observable<SearchResult[]>;

  constructor(
    private route: ActivatedRoute,
    private minifigsSvc: MinifigsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const set_num = params.get('set_num');

      this.minifig$ = this.minifigsSvc.getMinifig(set_num);
      this.minifigParts$ = this.minifigsSvc.getMinifigParts(set_num);
      this.minifigSets$ = this.minifigsSvc.getMinifigSets(set_num);
    });
  }
}
