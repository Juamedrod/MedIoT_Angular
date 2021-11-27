import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  changeState($event: any) {
    console.log($event.target.checked);//API petition
  }

}
