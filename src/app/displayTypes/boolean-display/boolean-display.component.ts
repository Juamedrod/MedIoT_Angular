import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'boolean-display',
  templateUrl: './boolean-display.component.html',
  styleUrls: ['./boolean-display.component.css']
})
export class BooleanDisplayComponent implements OnInit {
  @Input() variableNickname: string;
  @Input() variableId: string;
  @Input() variableState: boolean;

  constructor() {
    this.variableId = '';
    this.variableNickname = 'Variable ON/OFF Superguay!';
    this.variableState = false;
  }

  ngOnInit(): void {
  }
}
