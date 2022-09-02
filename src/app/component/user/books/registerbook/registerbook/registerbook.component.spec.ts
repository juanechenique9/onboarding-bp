import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterbookComponent } from './registerbook.component';

describe('RegisterbookComponent', () => {
  let component: RegisterbookComponent;
  let fixture: ComponentFixture<RegisterbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
