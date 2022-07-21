import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';

import { SearchItemModule } from '../shared/components/search-item/search-item.module';
import { LoadingModule } from '../shared/components/loading/loading.module';

import { MinifigsRoutingModule } from './minifigs-routing.module';
import { ViewMinifigComponent } from './view-minifig/view-minifig.component';

@NgModule({
  declarations: [
    ViewMinifigComponent
  ],
  imports: [
    CommonModule,
    LoadingModule,
    ReactiveFormsModule,
    SearchItemModule,
    MinifigsRoutingModule
  ]
})
export class MinifigsModule { }
