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
import { AuthGuard } from './Guards/auth.guard';
import { NoAuthGuard } from './Guards/no-auth.guard';
import { LogComponent } from './asides/log/log.component';
import { DetailingComponent } from './asides/detailing/detailing.component';
import { ExportsComponent } from './asides/exports/exports.component';
import { DevicesDocComponent } from './asides/devices-doc/devices-doc.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'aboutus', component: AboutUsComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', pathMatch: 'full', component: DevicesComponent },
      { path: 'blackboard', component: BlackboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'realtime', component: RealtimeComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'log', component: LogComponent },
      { path: 'detailing', component: DetailingComponent },
      { path: 'exports', component: ExportsComponent },
      { path: 'devdoc', component: DevicesDocComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
