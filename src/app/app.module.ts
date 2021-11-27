import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlackboardComponent } from './asides/blackboard/blackboard.component';
import { AsideComponent } from './aside/aside.component';
import { ProfileComponent } from './asides/profile/profile.component';
import { ChartComponent } from './asides/chart/chart.component';
import { SwitchComponent } from './asides/switch/switch.component';
import { BooleanDisplayComponent } from './asides/boolean-display/boolean-display.component';
import { RealtimeComponent } from './asides/realtime/realtime.component';
import { HistoryComponent } from './asides/history/history.component';
import { DevicesComponent } from './asides/devices/devices.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    AboutUsComponent,
    HeaderComponent,
    DashboardComponent,
    BlackboardComponent,
    AsideComponent,
    ProfileComponent,
    ChartComponent,
    SwitchComponent,
    BooleanDisplayComponent,
    RealtimeComponent,
    HistoryComponent,
    DevicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
