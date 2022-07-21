import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoadingModule } from '../shared/components/loading/loading.module';
import { SearchItemModule } from '../shared/components/search-item/search-item.module';

import { SetsRoutingModule } from './sets-routing.module';
import { ViewSetComponent } from './view-set/view-set.component';

@NgModule({
  declarations: [
    ViewSetComponent
  ],
  imports: [
    CommonModule,
    LoadingModule,
    ReactiveFormsModule,
    SearchItemModule,
    SetsRoutingModule
  ]
})
export class SetsModule { }
