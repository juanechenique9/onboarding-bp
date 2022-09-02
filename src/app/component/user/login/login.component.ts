import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users/users.service'
import { AuthUseCase } from '../../core/application/auth.usecase';
import { Auth } from '../../core/domain/auth';
import { Token } from '../../core/domain/token';
import { validationCustom } from '../../validation/validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  user!: string
  regexLogin = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,64})';
  existUser!: boolean;
 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private serviceUser: UsersService,
    private authUseCase: AuthUseCase
  ) {
    this.loginUser();
  }

  ngOnInit(): void {
  }

  loginUser() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required, validationCustom.validateNoExistUser(this.serviceUser)],
      password: [
        '',
        [Validators.required, Validators.pattern(this.regexLogin)],
      ],
    });
  }

  onLoginUser() {

    if (this.loginForm.invalid) {
      return;
    }
    const auth: Auth = this.loginForm.value;
    this.authUseCase.login(auth).subscribe((response: Token) => {
      console.log(response);
        this.authUseCase.setStorage('access_token', response.access_token);
        this.authUseCase.setStorage('username', response.user.username);
        this.authUseCase.setStorage('userId', response.user.userId);
        this.router.navigate(['/book']);
    })
  }
}
