import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';

import { SearchResult, Set } from '../../shared/interfaces';
import { SetsService } from '../sets.service';

@Component({
  selector: 'app-view-set',
  templateUrl: './view-set.component.html',
  styleUrls: ['./view-set.component.scss']
})
export class ViewSetComponent implements OnInit {
  set$: Observable<Set>;
  setAlternates$: Observable<SearchResult[]>;
  setMinifigs$: Observable<SearchResult[]>;
  setParts$: Observable<SearchResult[]>;

  constructor(
    private route: ActivatedRoute,
    private setsSvc: SetsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const set_num = params.get('set_num');

      this.set$ = this.setsSvc.getSet(set_num);
      this.setAlternates$ = this.setsSvc.getSetAlternates(set_num);
      this.setMinifigs$ = this.setsSvc.getSetMinifigs(set_num);
      this.setParts$ = this.setsSvc.getSetParts(set_num);
    });
  }
}
