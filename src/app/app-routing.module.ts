import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./components/add-event/add-event.component').then( m => m.AddEventComponent)
  },
  {
    path: 'edit-event',
    loadChildren: () => import('./components/edit-event/edit-event.component').then( m => m.EditEventComponent)
  },  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'opret',
    loadChildren: () => import('./pages/opret/opret.module').then( m => m.OpretPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
