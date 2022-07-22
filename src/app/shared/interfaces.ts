import { FormControl } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';

// GENERAL

export interface SearchResponsePartial {
  count: number;
  next?: string;
  previous?: string;
}

// MINIFIGS

export interface Minifig {
  last_modified_dt: string;
  name: string;
  num_parts: number;
  set_img_url?: string | SafeUrl;
  set_num: string;
  set_url: string;
}

export interface MinifigPart {
  id: number;
  inv_part_id: number;
  part: {
    name: string;
    part_cat_id: number;
    part_img_url?: string | SafeUrl;
    part_num: string;
    part_url: string;
  };
}

export interface MinifigPartResponse extends SearchResponsePartial {
  results: MinifigPart[];
}

export interface MinifigResponse extends SearchResponsePartial {
  results: Minifig[];
}

export interface MinifigSet {
  last_modified_dt: string;
  name: string;
  num_parts: number;
  set_img_url?: string | SafeUrl;
  set_num: string;
  set_url: string;
}

export interface MinifigSetResponse extends SearchResponsePartial {
  results: MinifigSet[];
}

// PARTS

export interface Part {
  category_name: string;
  external_ids: {
    BrickLink: string[];
    BrickOwl: string[];
  };
  name: string;
  part_cat_id: number;
  part_img_url?: string | SafeUrl;
  part_num: string;
}

export interface PartCategory {
  id: number;
  name: string;
  part_count: number;
}

export interface PartCategoryResponse extends SearchResponsePartial {
  results: PartCategory[];
}

export interface PartColor {
  color_id: number;
  color_name: string;
  part_img_url?: string | SafeUrl;
}

export interface PartColorResponse extends SearchResponsePartial {
  results: PartColor[];
}

export interface PartResponse extends SearchResponsePartial {
  results: Part[];
}

// SEARCH

export interface SearchCriteria {
  in_set_num?: string;
  in_theme_id?: number;
  min_parts?: number;
  max_parts?: number;
  min_year?: number;
  max_year?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
  part_cat_id?: number;
  search?: string;
  search_type: string;
  theme_id?: number;
}

export interface SearchForm {
  part_cat_id?: FormControl<string | null>,
  search?: FormControl<string | null>;
  search_type: FormControl<string>;
  theme_id?: FormControl<string | null>;
  year?: FormControl<string | null>;
}

export interface SearchResponse extends SearchResponsePartial {
  results: SearchResult[];
}

export interface SearchResult {
  designer_name?: string;
  designer_url?: string;
  id: number | string;
  imgUrl?: string | SafeUrl;
  moc_url?: string;
  name: string;
  quantity?: number;
  routerUrl?: string;
}

// SETS

export interface Set {
  last_modified_dt: string;
  name: string;
  num_parts: number;
  set_img_url?: string | SafeUrl;
  set_num: string;
  set_url: string;
  theme_id: number;
  theme_name: string;
  year: number;
}

export interface SetAlternate {
  designer_name: string;
  designer_url: string;
  name: string;
  num_parts: number;
  moc_img_url?: string | SafeUrl;
  moc_url: string;
  set_num: string;
  theme_id: number;
  year: number;
}

export interface SetAlternateResponse extends SearchResponsePartial {
  results: SetAlternate[];
}

export interface SetMinifig {
  id: number;
  quantity: number;
  set_name: string;
  set_num: string;
  set_img_url?: string | SafeUrl;
}

export interface SetMinifigResponse extends SearchResponsePartial {
  results: SetMinifig[];
}

export interface SetPart {
  id: number;
  inv_part_id: number;
  part: {
    name: string;
    part_cat_id: number;
    part_img_url?: string | SafeUrl;
    part_num: string;
    part_url: string;
  };
  quantity: number;
}

export interface SetPartResponse extends SearchResponsePartial {
  results: SetPart[];
}

export interface SetResponse extends SearchResponsePartial {
  results: Set[];
}

// THEMES

export interface Theme {
  id: number;
  name: string;
  parent_id: number;
}

export interface ThemeResponse extends SearchResponsePartial {
  results: Theme[];
}
