import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { host } from '../../environments/api';
import { getNoImageUrl } from '../shared/functions';
import { SearchResult, Set, SetAlternateResponse, SetMinifig, SetMinifigResponse, SetPart, SetPartResponse } from '../shared/interfaces';
import { ThemesService } from '../shared/services/themes.service';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  private readonly _noImageUrl: SafeUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
    private themesSvc: ThemesService
  ) {
    this._noImageUrl = this.domSanitizer.bypassSecurityTrustUrl(getNoImageUrl());
  }

  getSet(set_num: string): Observable<Set> {
    return combineLatest([
      this.themesSvc.themes$,
      this.http.get<Set>(`${host}/sets/${set_num}`)
    ]).pipe(
      map(([themes, set]) => {
        set.set_img_url = set.set_img_url || this._noImageUrl;

        return {
          ...set,
          theme_name: themes.find(theme => theme.id === set.theme_id)?.name
        }
      })
    );
  }

  getSetAlternates(set_num: string): Observable<SearchResult[]> {
    return this.http.get<SetAlternateResponse>(`${host}/sets/${set_num}/alternates/?ordering=name&page_size=1000`).pipe(
      map(response => response.results),
      map(results => results.map(result => {
        result.moc_img_url = result.moc_img_url || this._noImageUrl;

        return {
          designer_name: result.designer_name,
          designer_url: result.designer_url,
          id: result.set_num,
          imgUrl: result.moc_img_url,
          moc_url: result.moc_url,
          name: result.name,
          routerUrl: null
        };
      }))
    );
  }

  getSetMinifigs(set_num: string): Observable<SearchResult[]> {
    return this.http.get<SetMinifigResponse>(`${host}/sets/${set_num}/minifigs/?page_size=1000`).pipe(
      map(response => response.results),
      map(results => results.map(result => {
        result.set_img_url = result.set_img_url || this._noImageUrl;

        return {
          id: result.set_num,
          imgUrl: result.set_img_url,
          name: result.set_name,
          routerUrl: `/minifigs/${result.set_num}`
        };
      }))
    );
  }

  getSetParts(set_num: string): Observable<SearchResult[]> {
    return this.http.get<SetPartResponse>(`${host}/sets/${set_num}/parts/?page_size=1000`).pipe(
      map(response => response.results),
      map(results => results.map(result => {
        result.part.part_img_url = result.part.part_img_url || this._noImageUrl;

        return {
          id: result.part.part_num,
          imgUrl: result.part.part_img_url,
          name: result.part.name,
          quantity: result.quantity,
          routerUrl: `/parts/${result.part.part_num}`
        };
      }))
    );
  }
}
