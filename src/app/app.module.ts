import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {} from '@angular/cdk/collections';
import {AppComponent} from './app.component';
import { RegisterComponent } from './component/user/register/register.component';
import { LoginComponent } from './component/user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValueAcessorDirective } from './component/Directivas/input-value-accessor.directive';
import { CategoriesService } from './services/categories/categories.service';
import { UsersService } from './services/users/users.service';
import { AuthOperation } from './component/core/infraestructure/auth.operation';
import { AuthRepository } from './component/core/application/auth.repository';
import { StorageRepository } from './component/core/application/storage.repository';
import { StorageOperation } from './component/core/infraestructure/storage.operation';
import { BookComponent } from './component/user/books/book/book.component';
import { HeaderComponent } from './component/header/header/header.component';
import { RegisterbookComponent } from './component/user/books/registerbook/registerbook/registerbook.component';
import { BookService } from './services/books/book.service';
import { InterceptorService } from './services/interceptor/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    InputValueAcessorDirective,
    BookComponent,
    HeaderComponent,
    RegisterbookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CategoriesService,
    UsersService,
    BookService,
    { provide: AuthRepository, useClass: AuthOperation},
    { provide: StorageRepository, useClass: StorageOperation},
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
