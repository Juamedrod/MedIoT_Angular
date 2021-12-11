import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-devices-doc',
  templateUrl: './devices-doc.component.html',
  styleUrls: ['./devices-doc.component.css']
})
export class DevicesDocComponent implements OnInit {
  downloadURL: string;

  constructor() {
    this.downloadURL = environment.baseURL;
  }

  ngOnInit(): void {
  }

}
