import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it( 'function getUserExist', () => {
    let user: any = 'juan'
    service.getUserExist(user).subscribe((response) => {
    });

    const url = 'https://cangular-api.herokuapp.com/users/exist-name/' + ''.concat(`${user}`);
    console.log('juan', url)
    const req = httpTestingController.expectOne(url);
    const request = req.request
    expect(request.method).toBe('GET');
  });

  it( 'function addUser', () => {
    const user = {
      name: 'juan',
      email: 'juan@gmail.com',
      password: '12345',
      category: []
    };
    
    service.addUser(user).subscribe((response) => {
    });

    const url = 'https://cangular-api.herokuapp.com/users/' + ''.concat(`${user}`);
    console.log('juan', url)
    const req = httpTestingController.expectOne(url);
    const request = req.request
    expect(request.method).toBe('POST');
  });
});
