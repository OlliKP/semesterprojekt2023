import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./tab2/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./components/add-event/add-event.component').then( m => m.AddEventComponent)
  },
  {
    path: 'edit-event',
    loadChildren: () => import('./components/edit-event/edit-event.component').then( m => m.EditEventComponent)
  },  {
    path: 'introduction',
    loadChildren: () => import('./pages/introduction/introduction.module').then( m => m.IntroductionPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
