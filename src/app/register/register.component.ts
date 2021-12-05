import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.formulario = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
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
      agreements: new FormControl(false, [Validators.required, this.agreements])
    },
      [
        this.passwordValidator
      ]);
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.formulario.invalid) return;
    const response = await this.authService.register(this.formulario.value);
    if (response == undefined || response.error) {
      console.log(response);
      //message system to show the error
      return;
    }
    localStorage.setItem('authCredentials', response.token);
    this.authService.setToken(response.token);
    //message system para avisar al usuario del login correcto
    this.router.navigate(['/dashboard']);
  }

  checkError(controlName: string, error: string, touched: boolean): boolean | undefined {
    return touched ? this.formulario.get(controlName)?.hasError(error) && this.formulario.get(controlName)?.touched : this.formulario.get(controlName)?.hasError(error);
  }

  //VALIDADORES
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

  agreements(control: AbstractControl) {
    if (control.value) {
      return null;
    } else {
      return { agreements: 'Terminos y Condiciones no aceptadas' };
    }
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
