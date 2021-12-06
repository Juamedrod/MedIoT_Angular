import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  invalidForm() {
    return this.formulario.invalid && this.formulario.get('password')!.touched
  }

  async onsubmit() {
    if (this.formulario.invalid) return;
    try {
      const response = await this.authService.login(this.formulario.value)
      if (response == undefined || response.error) {
        console.log(response);///DELETE
        //message system to show the error
        return;
      }
      localStorage.setItem('authCredentials', response.token);
      this.authService.setToken(response.token);
      //message system para avisar al usuario del login correcto      
      this.router.navigate(['/dashboard']);

    } catch (error: any) {
      console.log(error.error);//sustituir este log por un mensaje del sistema de mensajes
    }
  }

}
