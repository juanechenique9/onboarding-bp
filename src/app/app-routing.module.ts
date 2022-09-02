import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/user/register/register.component';
import { LoginComponent } from './component/user/login/login.component';
import { BookComponent } from './component/user/books/book/book.component';
import { RegisterbookComponent } from './component/user/books/registerbook/registerbook/registerbook.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent,  },
  { path: 'login', component: LoginComponent },
  { path: 'book', component: BookComponent },
  { path: 'registerBook', component: RegisterbookComponent },
  { path: '**', component: RegisterComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
