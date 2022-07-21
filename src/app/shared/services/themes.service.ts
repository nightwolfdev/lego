import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { host } from '../../../environments/api';
import { Theme, ThemeResponse } from '../interfaces';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  private readonly _themes = new BehaviorSubject<Theme[]>([]);

  readonly themes$: Observable<Theme[]> = this._themes.asObservable();

  constructor(private http: HttpClient) {
    this.getThemes().subscribe();
  }

  private getThemes(): Observable<Theme[]> {
    return this.http.get<ThemeResponse>(`${host}/themes/?ordering=name&page_size=1000`).pipe(
      map(response => response.results),
      tap(themes => this._themes.next(themes))
    );
  }
}
