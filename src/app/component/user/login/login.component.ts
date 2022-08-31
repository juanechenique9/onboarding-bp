import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  regexLogin = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,64})';
  existEmail!: boolean;
  constructor(private fb: FormBuilder, private router: Router, private serviceUser: UsersService) { 
    this.loginUser();
  }

  ngOnInit(): void {
    this.validateUserExist();
  }

  loginUser() {
    this.loginForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.pattern(this.regexLogin)]],
      }
    );
  }

  validateUserExist() {
    this.loginForm.get('username')?.valueChanges.subscribe((nameUser) => {
      if (nameUser) {
        this.userExist(nameUser);
      }
    });
  }

  userExist(user: any) {
    this.serviceUser.getEmailExist(user).subscribe((response) => {
      console.log(response);
      if (response.exists) {
        this.existEmail = true;
      } else {
        this.existEmail = false;
      }
    });
  }

  onLoginUser() {
    if (this.loginForm.invalid) {
      return;
    }
    this.router.navigate(['/book'])
  }

}
