import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it( 'function getBook', () => {
    
    service.getBook().subscribe((response) => {
    });

    const url = 'https://cangular-api.herokuapp.com/books/owner';
    const req = httpTestingController.expectOne(url);
    const request = req.request
    expect(request.method).toBe('GET');
  });

  it( 'function addBook', () => {
    const book = {
      author: "Juan Echenique",
      category: [
        {
            "id": 2,
            "description": "Alternate history"
        },
        {
            "id": 4,
            "description": "Chick lit"
        },
        {
            "id": 3,
            "description": "Anthology"
        }
    ],
      id: "r61r6i667u",
      image: "https://itbook.store/img/books/9780134576978.png",
      public: false,
      resume: "A Hands-On Guide to Angular 2 and Angular 4",
      title: "Learning Angular, 2nd Edition",
      url: "https://itbook.store/books/9780134576978",
      userRegister: "c5zlakfgqsa"
    };

    service.addBook(book).subscribe((response) => {
    })

    const url = 'https://cangular-api.herokuapp.com/books/owner';
    console.log('juan', url)
    const req = httpTestingController.expectOne(url);
    const request = req.request
    expect(request.method).toBe('POST');
  });
});
