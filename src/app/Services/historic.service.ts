import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../Interfaces/data.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  baseURL: string;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.baseURL = 'http://192.168.1.39:3000/api/data'
  }

  getData(dId: string, quantity: string) {
    return this.httpClient.get<Data[]>(`${this.baseURL}/${dId}/${quantity}`, this.authService.getAuthHeaders()).toPromise();
  }
}
