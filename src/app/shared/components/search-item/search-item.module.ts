import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SearchItemComponent } from './search-item.component';

@NgModule({
  declarations: [SearchItemComponent],
  exports: [SearchItemComponent],
  imports: [CommonModule, RouterModule]
})
export class SearchItemModule { }
