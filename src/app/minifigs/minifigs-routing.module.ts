import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewMinifigComponent } from './view-minifig/view-minifig.component';

const routes: Routes = [
  {
    path: ':set_num',
    component: ViewMinifigComponent,
    data: {
      pageTitle: 'View Minifig'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinifigsRoutingModule { }
