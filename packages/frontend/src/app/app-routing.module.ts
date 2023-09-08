import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { RafflesComponent } from './raffles/raffles.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'raffles', component: RafflesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
