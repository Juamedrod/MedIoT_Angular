import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlackboardComponent } from './asides/blackboard/blackboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './asides/profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RealtimeComponent } from './asides/realtime/realtime.component';
import { DevicesComponent } from './asides/devices/devices.component';
import { HistoryComponent } from './asides/history/history.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'aboutus', component: AboutUsComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', pathMatch: 'full', component: BlackboardComponent },
      { path: 'blackboard', component: BlackboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'realtime', component: RealtimeComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'history', component: HistoryComponent },

    ]
  },
  { path: '**', redirectTo: '/register' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
