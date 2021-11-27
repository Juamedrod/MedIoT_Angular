import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  formulario: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      dni: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      repite_password: new FormControl('', [Validators.required]),
      agreements: new FormControl(false, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formulario.invalid) return;
    console.log(this.formulario.value);//enviar a la api

  }

  checkError(controlName: string, error: string, touched: boolean): boolean | undefined {
    return touched ? this.formulario.get(controlName)?.hasError(error) && this.formulario.get(controlName)?.touched : this.formulario.get(controlName)?.hasError(error);
  }

  //VALIDADORES
}
