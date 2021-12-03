import { Injectable } from '@angular/core';
import { DisplayConfig } from '../Interfaces/DisplayConfig.interface';

@Injectable({
  providedIn: 'root'
})
export class BlackboardService {
  arrConfig: DisplayConfig[];

  constructor() {
    this.arrConfig = [];
  }

  /**
 * PROVISIONAL FUNCTION TO TEST INTERACTION BETWEEN COMPONENTS
 */
  storeArrConfig(arrConfig: DisplayConfig[]) {
    this.arrConfig = arrConfig;//This function have to save this config array in the database
  }

  getArrConfig(): DisplayConfig[] {
    return this.arrConfig;
  }
}


