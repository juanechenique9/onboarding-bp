import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {} from '@angular/cdk/collections';
import {AppComponent} from './app.component';
import { RegisterComponent } from './component/user/register/register.component';
import { LoginComponent } from './component/user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValueAcessorDirective } from './component/Directivas/input-value-accessor.directive';
import { CategoriesService } from './services/categories/categories.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    InputValueAcessorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CategoriesService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
