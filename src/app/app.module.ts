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
import { ChartComponent } from './displayTypes/chart/chart.component';
import { SwitchComponent } from './displayTypes/switch/switch.component';
import { BooleanDisplayComponent } from './displayTypes/boolean-display/boolean-display.component';
import { RealtimeComponent } from './asides/realtime/realtime.component';
import { HistoryComponent } from './asides/history/history.component';
import { DevicesComponent } from './asides/devices/devices.component';
import { HttpClientModule } from '@angular/common/http';
import { LogComponent } from './asides/log/log.component';


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
    DevicesComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
