import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthRepository } from '../../core/application/auth.repository';
import { StorageRepository } from '../../core/application/storage.repository';
import { AuthOperation } from '../../core/infraestructure/auth.operation';
import { StorageOperation } from '../../core/infraestructure/storage.operation';
import { InputValueAcessorDirective } from '../../Directivas/input-value-accessor.directive';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, , InputValueAcessorDirective],
      providers: [
        { provide: AuthRepository, useClass: AuthOperation},
        { provide: StorageRepository, useClass: StorageOperation},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
