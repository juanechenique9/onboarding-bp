import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CategoriesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it( 'function getCategories', () => {
    service.getCategories().subscribe((response) => {
    });

    const category = 'https://cangular-api.herokuapp.com/category';
    const req = httpTestingController.expectOne(category);
    const request = req.request
    expect(request.method).toBe('GET');
  });
});
