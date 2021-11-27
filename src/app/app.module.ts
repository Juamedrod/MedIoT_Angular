import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlackboardComponent } from './blackboard/blackboard.component';
import { AsideComponent } from './aside/aside.component';
import { ProfileComponent } from './profile/profile.component';
import { ChartComponent } from './chart/chart.component';
import { SwitchComponent } from './switch/switch.component';

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
    SwitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
