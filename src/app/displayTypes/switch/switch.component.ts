import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
  @Input() variableId: string;
  @Input() variableState: boolean;
  @Input() variableNickname: string;


  constructor() {
    this.variableId = '';
    this.variableNickname = 'Variable ON/OFF Superguay!';
    this.variableState = false;
  }

  ngOnInit(): void {
  }

  changeState($event: any) {
    this.variableState = $event.target.checked
    const jsonState = {
      variableId: this.variableId,
      newState: this.variableState
    }
    console.log(jsonState);//cambiar por la llamada a la api
  }
}
