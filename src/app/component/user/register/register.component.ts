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
import { Router } from '@angular/router';
import { CategoriesService } from '../../../services/categories/categories.service';
import { UsersService } from '../../../services/users/users.service';
import { Icategories } from '../../models/categories/categories';
import { Iuser } from '../../models/users/user';
import { validationCustom } from '../../validation/validation';

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
  checkMessage: boolean = true;
  selection = new SelectionModel<any>(
    true, // multiple selection or not
    [] // initial selected values
  );

  constructor(
    private fb: FormBuilder,
    private serviceCategorie: CategoriesService,
    private serviceUser: UsersService,
    private router: Router
  ) {
    this.formUser();
  }
 
  ngOnInit(): void {
    this.allCategories();
  }

  formUser() {
    this.userForm = this.fb.group(
      {
        name: ['', Validators.required, validationCustom.validateUserExist(this.serviceUser)],
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



  onChecked() {
    if (this.selection.selected.length < 3) {
      this.checkMessage = true;
    } else {
      this.checkMessage = false;
    }
  }

  onCreateUser() {
    if (this.userForm.invalid) {
      return;
    }

    const data = this.userForm.getRawValue();
    let userToSave: Iuser = {
      name: data.name,
      email: data.email,
      password: data.password,
      category: [this.selection.selected],
    };

    this.serviceUser.addUser(userToSave).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/login'])
    });
  }
}
