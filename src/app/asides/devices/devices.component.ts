import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  formulario: FormGroup;
  variables: string[];
  idAvaliable: boolean;

  constructor() {
    this.idAvaliable = false;
    this.variables = [];
    this.formulario = new FormGroup({
      device: new FormControl('', [Validators.required]),
      deviceName: new FormControl('', [Validators.required]),
      dId: new FormControl('', [Validators.required])
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

  addVariableToForm() {
    this.formulario.addControl(`variable${this.variables.length + 1}`, new FormControl('', [Validators.required]));
    this.variables.push(`variable${this.variables.length + 1}`);
  }

  delete(index: number) {
    this.variables.splice(index, 1);
  }

  validateId() {
    this.idAvaliable = true;//Este metodo mira en la BD si el id unico ya está ocupado.
  }

  //VALIDADORES
}
