import { Component, OnInit } from '@angular/core';
import { AuthUseCase } from '../../core/application/auth.usecase'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nameUser!: any;

  constructor(private auteCase: AuthUseCase) { }

  ngOnInit(): void {
    this.getUserLogged()
  }

  getUserLogged(){
   this.nameUser = sessionStorage.getItem('username');
  }

}
