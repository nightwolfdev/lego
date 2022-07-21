import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { host } from '../../environments/api';
import { getNoImageUrl } from '../shared/functions';
import { Minifig, MinifigPartResponse, MinifigSetResponse, SearchResult } from '../shared/interfaces';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MinifigsService {
  private readonly _noImageUrl: SafeUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this._noImageUrl = this.domSanitizer.bypassSecurityTrustUrl(getNoImageUrl());
  }

  getMinifig(set_num: string): Observable<Minifig> {
    return this.http.get<Minifig>(`${host}/minifigs/${set_num}/`).pipe(
      map(response => {
        response.set_img_url = response.set_img_url || this._noImageUrl;

        return response;
      })
    );
  }

  getMinifigParts(set_num: string): Observable<SearchResult[]> {
    return this.http.get<MinifigPartResponse>(`${host}/minifigs/${set_num}/parts/?page_size=1000`).pipe(
      map(response => response.results),
      map(results => results.map(result => {
        result.part.part_img_url = result.part.part_img_url || this._noImageUrl;

        return {
          id: result.part.part_num,
          imgUrl: result.part.part_img_url,
          name: result.part.name,
          routerUrl: `/parts/${result.part.part_num}`
        };
      }))
    );
  }

  getMinifigSets(set_num: string): Observable<SearchResult[]> {
    return this.http.get<MinifigSetResponse>(`${host}/minifigs/${set_num}/sets/?ordering=name&page_size=1000`).pipe(
      map(response => response.results),
      map(results => results.map(result => {
        result.set_img_url = result.set_img_url || this._noImageUrl;

        return {
          id: result.set_num,
          imgUrl: result.set_img_url,
          name: result.name,
          routerUrl: `/sets/${result.set_num}`
        };
      }))
    );
  }
}
