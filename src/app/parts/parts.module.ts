import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchItemModule } from '../shared/components/search-item/search-item.module';
import { LoadingModule } from '../shared/components/loading/loading.module';

import { PartsRoutingModule } from './parts-routing.module';
import { ViewPartComponent } from './view-part/view-part.component';

@NgModule({
  declarations: [
    ViewPartComponent
  ],
  imports: [
    CommonModule,
    LoadingModule,
    ReactiveFormsModule,
    SearchItemModule,
    PartsRoutingModule
  ]
})
export class PartsModule { }
