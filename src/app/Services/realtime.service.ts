import { Injectable } from '@angular/core';
import { DisplayConfig } from '../Interfaces/DisplayConfig.interface';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  arrConfig: DisplayConfig[];

  constructor() {
    this.arrConfig = [];
  }
}
