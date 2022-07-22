import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { buildYears } from '../shared/functions';
import { PartCategory, SearchCriteria, SearchForm, SearchResponse, Theme } from '../shared/interfaces';
import { PartsService } from '../parts/parts.service';
import { SearchService } from '../shared/services/search.service';
import { ThemesService } from '../shared/services/themes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  categories$: Observable<PartCategory[]>;
  form: FormGroup<SearchForm>;
  searching = false;
  searchResults$: Observable<SearchResponse | null>;
  searchTypes = [
    {
      id: 'minifigs',
      name: 'Minifigs'
    },
    {
      id: 'parts',
      name: 'Parts'
    },
    {
      id: 'sets',
      name: 'Sets'
    }
  ];
  themes$: Observable<Theme[]>;
  years = buildYears();

  constructor(
    private partsSvc: PartsService,
    private searchSvc: SearchService,
    private themesSvc: ThemesService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup<SearchForm>({
      part_cat_id: new FormControl(''),
      search: new FormControl(''),
      search_type: new FormControl('sets'),
      theme_id: new FormControl(''),
      year: new FormControl(''),
    });

    this.searchResults$ = this.searchSvc.searchResults$.pipe(
      tap(() => this.searching = false)
    );

    this.categories$ = this.partsSvc.partCategories$;

    this.themes$ = this.themesSvc.themes$;

    if (this.searchSvc.getCurrentSearchCriteria()) {
      this.form.patchValue({
        year: this.searchSvc.getCurrentSearchCriteria()?.min_year?.toString() || '',
        part_cat_id: this.searchSvc.getCurrentSearchCriteria()?.part_cat_id?.toString(),
        search: this.searchSvc.getCurrentSearchCriteria()?.search,
        search_type: this.searchSvc.getCurrentSearchCriteria()?.search_type,
        theme_id: this.searchSvc.getCurrentSearchCriteria()?.theme_id?.toString() || this.searchSvc.getCurrentSearchCriteria()?.in_theme_id?.toString() || ''
      });
    }
  }

  prevNext(url: string): void {
    const searchParams = url.split('?')[1];
    const searchCriteria = Object.fromEntries(new URLSearchParams(searchParams));

    const newSearchCriteria = {
      ...searchCriteria,
      search_type: this.searchSvc.getCurrentSearchCriteria().search_type
    };

    this.searching = true;

    this.searchSvc.search(newSearchCriteria);
  }

  search(): void {
    const year = this.form.get('year').value;
    const partCatId = this.form.get('part_cat_id').value;
    const search = this.form.get('search').value;
    const searchType = this.form.get('search_type').value;
    const themeId = this.form.get('theme_id').value;

    const searchCriteria: SearchCriteria = {
      max_year: year ? +year : null,
      min_year: year ? +year : null,
      ordering: 'name',
      page: 1,
      page_size: 100,
      part_cat_id: partCatId ? +partCatId : null,
      search: search || null,
      search_type: searchType
    }

    if (searchType === 'minifigs') {
      searchCriteria.in_theme_id = themeId ? +themeId : null;
    } else {
      searchCriteria.theme_id = themeId ? +themeId : null;
    }
    
    this.searching = true;

    this.searchSvc.search(searchCriteria);
  }
}
