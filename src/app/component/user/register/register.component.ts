import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public userForm!: FormGroup;
  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/
  categoria: any = [
    { id: 1, name: 'Anime', code : 'ani' },
    { id: 2, name: 'Ciencia Ficcion', code : 'cien' },
    { id: 3, name: 'Novelas', code : 'nove'},
    { id: 4, name: 'Drama', code : 'dra'},
    { id: 5, name: 'Inteligencia Artificial', code : 'ia'}
  ];
  constructor(private fb: FormBuilder) {
    this.formUser();
  }


  ngOnInit(): void {

  }

  formUser() {
    this.userForm = this.fb.group({
      nameUser: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(this.regex)]],
      passwordTwo: [''],
      categorias: [[], Validators.required],
    }, { validators: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordTwo')?.value
    return pass === confirmPass ? null : { notSame: true }
  }


  onCheckChange(event: any) {

    /*  console.log(array);

    const formArray: FormArray = this.form.get('categorias') as FormArray;

     if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
      if (formArray.length < 3){ 
          console.log('Debe seleccionar al menos 3 categorias.');
      }
    } else {
      const index = formArray.controls.findIndex(x => x.value === event.target.value);
      console.log('hola', index) 

    } */


  } 
}
