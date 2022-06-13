import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chats',
    loadComponent: () =>
      import('./chats/chats.component').then((mod) => mod.ChatsComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((mod) => mod.ProfileComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
