import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { host } from '../../environments/api';
import { getNoImageUrl } from '../shared/functions';
import { Part, PartCategory, PartCategoryResponse, PartColorResponse, SearchResult } from '../shared/interfaces';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  private readonly _noImageUrl: SafeUrl;
  private readonly _partCategories = new BehaviorSubject<PartCategory[]>([]);
  
  readonly partCategories$: Observable<PartCategory[]> = this._partCategories.asObservable();

  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this._noImageUrl = this.domSanitizer.bypassSecurityTrustUrl(getNoImageUrl());
    this.getPartCategories().subscribe();
  }

  private getPartCategories(): Observable<PartCategory[]> {
    return this.http.get<PartCategoryResponse>(`${host}/part_categories/?ordering=name&page_size=1000`).pipe(
      map(response => response.results),
      tap(partCategories => this._partCategories.next(partCategories))
    );
  }

  getPart(part_num: string): Observable<Part> {
    return combineLatest([
      this.partCategories$,
      this.http.get<Part>(`${host}/parts/${part_num}/`)
    ]).pipe(
      map(([categories, part]) => {
        part.part_img_url = part.part_img_url || this._noImageUrl;

        return {
          ...part,
          category_name: categories.find(category => category.id === part.part_cat_id)?.name
        }
      })
    );
  }

  getPartColors(part_num: string): Observable<SearchResult[]> {
    return this.http.get<PartColorResponse>(`${host}/parts/${part_num}/colors/?page_size=1000`).pipe(
      map(response => response.results),
      map(results => results.map(result => {
        result.part_img_url = result.part_img_url || this._noImageUrl;

        return {
          id: result.color_id,
          imgUrl: result.part_img_url,
          name: result.color_name,
          routerUrl: null
        };
      }))
    );
  }
}
