import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { InputValueAcessorDirective } from '../../Directivas/input-value-accessor.directive';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent, InputValueAcessorDirective ],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onCreateUser', () => {
    component.onCreateUser();

    const expectData = [{
      name: 'juan',
      email: 'juan@gmail.com',
      password: 'Echenique_93',
      category: [{id: 4, 
        description: 'childre'},
      {
        id: 5, 
        description: 'chick'
      }],
    }];

    const url = 'https://cangular-api.herokuapp.com/users/' + ''.concat(`${expectData}`);
    const req = httpTestingController.expectOne(url);
    req.flush(expectData);
    expect(component).toBeDefined();
  });

  it('should userExist', () => {
    let user: any = 'juan'
    component.userExist(user)


    expect(component).toBeDefined();
  });
});
