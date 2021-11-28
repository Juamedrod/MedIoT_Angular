import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/Interfaces/device.interface';
import { DevicesService } from 'src/app/Services/devices.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  formulario: FormGroup;
  devices: Device[];
  variables: string[];
  idAvaliable: boolean;
  clicked: boolean;
  constructor(private devicesService: DevicesService) {
    this.clicked = false;
    this.idAvaliable = false;
    this.variables = [];
    this.devices = this.devicesService.getAll();
    this.formulario = new FormGroup({
      deviceType: new FormControl('', [Validators.required]),
      nickname: new FormControl('', [Validators.required]),
      dId: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formulario.invalid) return;
    const device: Device = {
      deviceType: this.formulario.get('deviceType')?.value,
      dId: this.formulario.get('dId')?.value,
      nickname: this.formulario.get('nickname')?.value,
      variables: this.variables
    }
    this.devicesService.create(device);
    console.log(device);//enviar a la api
    this.formulario.reset();
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

  validateId($event: any) {
    $event.stopPropagation();
    this.clicked = true;
    this.idAvaliable = true;//Este metodo mira en la BD si el id unico ya está ocupado.
  }

  //VALIDADORES
}
