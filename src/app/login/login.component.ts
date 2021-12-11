import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { msgType } from '../Interfaces/message.interface';
import { AuthService } from '../Services/auth.service';
import { MessagesSystemService } from '../Services/messages-system.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;

  constructor(private authService: AuthService, private router: Router, private messageService: MessagesSystemService) {
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
        this.messageService.newMessage({ message: 'Auth credential error', messageType: msgType.error });
        return;
      }
      localStorage.setItem('authCredentials', response.token);
      this.authService.setToken(response.token);
      this.messageService.newMessage({ message: 'Login success', messageType: msgType.success });
      this.router.navigate(['/dashboard']);

    } catch (error: any) {
      this.messageService.newMessage({ message: 'Auth credential error,Try again.', messageType: msgType.error });
    }
  }
}
