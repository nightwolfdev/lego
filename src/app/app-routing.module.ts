import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
    data: {
      pageTitle: 'About'
    }
  },
  {
    path: 'search',
    component: SearchComponent
  }, 
  {
    path: 'minifigs',
    loadChildren: () => import('./minifigs/minifigs.module').then(m => m.MinifigsModule),
    data: {
      pageTitle: 'Minifigs'
    }
  },
  {
    path: 'parts',
    loadChildren: () => import('./parts/parts.module').then(m => m.PartsModule),
    data: {
      pageTitle: 'Parts'
    }
  },  
  {
    path: 'sets',
    loadChildren: () => import('./sets/sets.module').then(m => m.SetsModule),
    data: {
      pageTitle: 'Sets'
    }
  },    
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search'
  },
  {
    path: '**',
    redirectTo: 'search'
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
