import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)

        ]),
      dni: new FormControl('', [
        this.dniValidator
      ]),
      password: new FormControl('', [Validators.required]),
      repite_password: new FormControl('', [Validators.required]),
      agreements: new FormControl(false, [Validators.required])
    },
      [
        this.passwordValidator
      ]);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formulario.invalid) return;
    console.log(this.formulario.value);

  }

  checkError(controlName: string, error: string, touched: boolean): boolean | undefined {
    return touched ? this.formulario.get(controlName)?.hasError(error) && this.formulario.get(controlName)?.touched : this.formulario.get(controlName)?.hasError(error);
  }

  //VALIDADORES

  edadValidator(control: AbstractControl) {
    const edadValue = parseInt(control.value);
    const minAge = 18;
    const maxAge = 99;

    if (edadValue >= minAge && edadValue <= maxAge) {
      return null;
    } else {
      return { edadvalidator: { min: minAge, max: maxAge, msg: `La edad no está entre ${minAge} y ${maxAge}` } };
    }
  }

  dniValidator(control: AbstractControl) {
    let dni = control.value;
    let numero: number = parseInt(dni.substring(0, dni.length));
    let letr: string = dni.substring(dni.length - 1);
    let letra = 'TRWAGMYFPDXBNJZSQVHLCKET';

    if (/^\d{8}[a-zA-Z]$/.test(dni)) {
      numero = numero % 23;
      letra = letra.substring(numero, numero + 1);

      if (letra.toUpperCase() == letr.toUpperCase()) {
        return null;
      }
    }
    return { dnivalidator: true }
  }

  passwordValidator(formulario: AbstractControl) {
    const password = formulario.get('password')?.value;
    const repitePassword = formulario.get('repite_password')?.value;

    if (password === repitePassword) {
      return null;
    } else {
      return { passwordvalidator: 'Las contraseñas no coinciden' };
    }
  }

}
