import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { LandComponent } from './land/land.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './security/auth-guard';

const routes: Routes = [
  { path: 'login', component: HomeComponent, data: { title: 'Log in' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
  { path:'main', component: LandComponent, canActivate:[AuthGuard],
  children:[
    { path: '', redirectTo: 'chat', pathMatch:'full'},
    { path:'chat',component:ChatComponent,data:{title:'ChatBot'}}
  ]

},
{ path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
