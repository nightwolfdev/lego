import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewSetComponent } from './view-set/view-set.component';

const routes: Routes = [
  {
    path: ':set_num',
    component: ViewSetComponent,
    data: {
      pageTitle: 'View Set'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetsRoutingModule { }
