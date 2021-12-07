import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user.interface';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  switcher: number;
  eraserRoullete: number;
  formulario: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
    this.eraserRoullete = 0;
    this.switcher = 0;
    this.formulario = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      avatar: new FormControl(''),
      email: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
        ]),
      dni: new FormControl('', [
        this.dniValidator
      ]),
    })
  }

  async ngOnInit() {
    this.user = await this.authService.getUserAPI();
  }

  async onSubmit() {
    this.user = await this.authService.update(this.formulario.value);
  }

  /**
   * Logout function
   */
  logout() {
    localStorage.removeItem('authCredentials');
    this.router.navigate(['/login']);
  }

  async deleteAccount() {
    try {
      await this.authService.remove(this.user);
      localStorage.removeItem('authCredentials');
      this.router.navigate(['/register']);
    } catch (error) {
      console.log(error);///DELETE DELETE DELETE
    }
  }

  setView(index: number) {
    this.switcher = index;
    switch (index) {
      case 0:
        this.eraserRoullete = 0;
        this.updateCard();
        break;

      case 1:
        this.eraserRoullete = 0;
        this.updateFormData();
        break;

      default:
        break;
    }
  }

  /**
   *  Update the info displayed in the card with the actual API data.
   * @returns {void}
   */
  async updateCard() {
    this.user = await this.authService.getUserAPI();
  }

  updateFormData() {
    this.formulario.setValue({ name: this.user.name, surname: this.user.surname, avatar: (this.user.avatar || ''), email: this.user.email, dni: this.user.dni });
  }

  eraseRoulette(index: number) {
    this.eraserRoullete = index;
  }

  /**
   * This function check in the form for errors
   * @param controlName Form control name for the input
   * @param error Error name taht should be displayed if this validator fails
   * @param touched True if you want the validator to run if the input is touched, false otherwise
   * @returns true or false if there is error.
   */
  checkError(controlName: string, error: string, touched: boolean): boolean | undefined {
    return touched ? this.formulario.get(controlName)?.hasError(error) && this.formulario.get(controlName)?.touched : this.formulario.get(controlName)?.hasError(error);
  }

  /**
   *  Validators for the form
   */
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
}
