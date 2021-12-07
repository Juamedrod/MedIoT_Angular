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
    this.devices = [];
    this.formulario = new FormGroup({
      deviceType: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      nickname: new FormControl('', [Validators.required]),
      dId: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    this.devices = await this.devicesService.getAll();
  }

  async onSubmit() {
    if (this.formulario.invalid || !this.idAvaliable) return;
    let variables = [];
    for (let i = 0; i < this.variables.length; i++) {
      variables.push(this.formulario.get(`variable${i + 1}`)?.value);
    };
    const device: Device = {
      deviceType: this.formulario.get('deviceType')?.value,
      description: this.formulario.get('description')?.value,
      dId: this.formulario.get('dId')?.value,
      nickname: this.formulario.get('nickname')?.value,
      variables: variables
    }
    const newDevice = await this.devicesService.create(device);
    this.formulario.reset();
    this.clicked = false;
    this.idAvaliable = false;
    this.devices = await this.devicesService.getAll();
  }

  addVariableToForm() {
    this.formulario.addControl(`variable${this.variables.length + 1}`, new FormControl('', [Validators.required]));
    this.variables.push(`variable${this.variables.length + 1}`);
  }

  deleteVariableFromForm(index: number) {
    this.formulario.removeControl(`variable${index + 1}`);
    this.variables.splice(index, 1);
  }

  async validateId($event: any) {
    const response = await this.devicesService.checkId(this.formulario.get('dId')!.value);
    if (response.avaliable != true) {
      this.idAvaliable = false;
    } else {
      this.idAvaliable = true;//Este metodo mira en la BD si el id unico ya está ocupado.
    }
    this.clicked = true;
  }

  resetButton() {
    this.idAvaliable = false;
    this.clicked = false
  }

  //CUSTOM VALIDATORS
  checkError(controlName: string, error: string, touched: boolean): boolean | undefined {
    return touched ? this.formulario.get(controlName)?.hasError(error) && this.formulario.get(controlName)?.touched : this.formulario.get(controlName)?.hasError(error);
  }

}
