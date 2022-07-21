import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';

import { Part, SearchResult } from '../../shared/interfaces';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-view-part',
  templateUrl: './view-part.component.html',
  styleUrls: ['./view-part.component.scss']
})
export class ViewPartComponent implements OnInit {
  part$: Observable<Part>;
  partColors$: Observable<SearchResult[]>;

  constructor(
    private route: ActivatedRoute,
    private partsSvc: PartsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const part_num = params.get('part_num');

      this.part$ = this.partsSvc.getPart(part_num);
      this.partColors$ = this.partsSvc.getPartColors(part_num);
    });
  }
}
