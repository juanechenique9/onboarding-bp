import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Icategories } from 'src/app/component/models/categories/categories';
import { BookService } from '../../../../services/books/book.service';
import { CategoriesService } from '../../../../services/categories/categories.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  listBooks: Array<any> = new Array<any>();
  copylistBooks: Array<any> = new Array<any>();
  listCategories: Array<Icategories> = new Array<Icategories>();
  public bookSearch!: FormGroup;

  constructor(private router: Router, private servicebook: BookService, 
  private serviceCategorie: CategoriesService, 
  private fb: FormBuilder) { 
    this.formSearchBook();
  }

  ngOnInit(): void {
    this.allCategories();
    this.searchBook()
    this.allBooks();
  }

  private formSearchBook(): void {
    this.bookSearch = this.fb.group({
      titleSearch: new FormControl(''),
    });
  }

  addBook() {
    this.router.navigate(['/registerBook']);
  }

  allBooks() {
    this.servicebook.getBook().subscribe((response) => {
      this.listBooks = response;
      this.copylistBooks = response;
      console.log(response)
    });
  }

  allCategories() {
    this.serviceCategorie.getCategories().subscribe((response) => {
      this.listCategories = response;
      const filter = this.listCategories.slice(1, 6);
      this.listCategories = filter;
    });
  }

  searchBook() {
    this.bookSearch
      .get('titleSearch')
      ?.valueChanges.subscribe((nameBook) => {
        if (nameBook === '') {
          this.listBooks = this.copylistBooks;
        } else {
          this.listBooks = this.copylistBooks.filter((x) => {
            return x.title?.toLowerCase().includes(nameBook.toLowerCase());
          });
        }
      });
  }

  selectCategory(evt : any) {
    console.log(evt)
    // let categoria

    // categoria = this.copylistBooks.map((item) => {
    //   return item.category.map((x) => {
    //       return x
    //   })
    // })

    // this.listBooks = cate.map((z) => {
    //   return z[0].id
    // })

    
  }

}
