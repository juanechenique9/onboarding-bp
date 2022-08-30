import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/user/register/register.component';
import { LoginComponent } from './component/user/login/login.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: RegisterComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
