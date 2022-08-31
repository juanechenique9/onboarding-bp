import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Icategories } from '../../models/categories/categories';
import { Iuser } from '../../models/users/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public userForm!: FormGroup;
  regex = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,64})';
  listCategories: Array<Icategories> = new Array<Icategories>();
  existUser!: boolean;
  selection = new SelectionModel<any>(
    true, // multiple selection or not
    [] // initial selected values
  );

  constructor(
    private fb: FormBuilder,
    private serviceCategorie: CategoriesService,
    private serviceUser: UsersService
  ) {
    this.formUser();
  }

  ngOnInit(): void {
    this.allCategories();
    this.validateUserExist();
  }

  formUser() {
    this.userForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.pattern(this.regex)]],
        passwordTwo: ['', Validators.required],
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordTwo')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  allCategories() {
    this.serviceCategorie.getCategories().subscribe((response) => {
      this.listCategories = response;
      const filter = this.listCategories.slice(1, 6);
      this.listCategories = filter;
    });
  }

  validateUserExist() {
    this.userForm.get('name')?.valueChanges.subscribe((nameUser) => {
      if (nameUser) {
        this.userExist(nameUser);
      }
    });
  }

  userExist(user: any) {
    this.serviceUser.getUserExist(user).subscribe(
      (response) => {
        console.log(response);
        if (response.exists) {
          this.existUser = true;
        } else {
          this.existUser = false;
        }
      },
      (error: any) => {
        console.error('hola', error);
      }
    );
  }
}
