import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ibook } from 'src/app/component/models/books/book';
import { Icategories } from 'src/app/component/models/categories/categories';
import { BookService } from '../../../../../services/books/book.service';
import { CategoriesService } from '../../../../../services/categories/categories.service';

@Component({
  selector: 'app-registerbook',
  templateUrl: './registerbook.component.html',
  styleUrls: ['./registerbook.component.scss']
})
export class RegisterbookComponent implements OnInit {
  public bookForm!: FormGroup;
  listCategories: Array<Icategories> = new Array<Icategories>();
  selection = new SelectionModel<any>(
    true, // multiple selection or not
    [] // initial selected values
  );


  constructor(private fb: FormBuilder, private router: Router, private serviceCategorie: CategoriesService, 
    private serviceBook: BookService) {
    this.formBook();
   }

  ngOnInit(): void {
    this.allCategories();
  }

  formBook() {
    this.bookForm = this.fb.group(
      {
        author: ['', Validators.required],
        resume: ['', Validators.required],
        image: ['', Validators.required],
        url: ['', Validators.required],
        title: ['', Validators.required],
        public: [false, Validators.required ]
      }
    );
  }

  allCategories() {
    this.serviceCategorie.getCategories().subscribe((response) => {
      this.listCategories = response;
      const filter = this.listCategories.slice(1, 6);
      this.listCategories = filter;
    });
  }

  onCreateBook() {
    if (this.bookForm.invalid) {
      return;
    }

    const data = this.bookForm.getRawValue();
    let bookToSave: Ibook = {
      title: data.title,
      author: data.author,
      url: data.url,
      image: data.image,
      resume: data.resume,
      category: this.selection.selected,
      public: data.public,
    };

    console.log(bookToSave)
    this.serviceBook.addBook(bookToSave).subscribe((response) => {
      this.router.navigate(['/book'])
    })


    
  }

  cancelRegister(){
    this.router.navigate(['/book'])
  }
}
