import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes:Routes=[
  { path: 'login', loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule) },
  { path: 'post-login', loadChildren:()=>import('./post-login/post-login.module').then(m=>m.PostLoginModule) , canActivate:[AuthGuard]},
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:"**", redirectTo:'login'}


]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
