import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewPartComponent } from './view-part/view-part.component';

const routes: Routes = [
  {
    path: ':part_num',
    component: ViewPartComponent,
    data: {
      pageTitle: 'View Part'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartsRoutingModule { }
