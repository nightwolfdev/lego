import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SearchResult } from '../../interfaces';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchItemComponent {
  @Input() searchResults: SearchResult[];
}
