import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthRepository } from '../../core/application/auth.repository';
import { StorageRepository } from '../../core/application/storage.repository';
import { AuthOperation } from '../../core/infraestructure/auth.operation';
import { StorageOperation } from '../../core/infraestructure/storage.operation';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthRepository, useClass: AuthOperation},
        { provide: StorageRepository, useClass: StorageOperation},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
