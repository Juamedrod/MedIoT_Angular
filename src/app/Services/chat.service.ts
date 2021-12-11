import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Chat } from '../Interfaces/chat.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseURL: string;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.baseURL = environment.baseURL + '/api/chat/';
  }

  getAll(): Promise<Chat[]> {
    return this.httpClient.get<Chat[]>(this.baseURL, this.authService.getAuthHeaders()).toPromise();
  }

  newChat(message: string) {
    return this.httpClient.post<Chat>(this.baseURL, { message }, this.authService.getAuthHeaders()).toPromise();
  }

  newResponse(chatId: string, message: string): Promise<Chat> {
    return this.httpClient.put<Chat>(this.baseURL + '?chatId=' + chatId, { message }, this.authService.getAuthHeaders()).toPromise();
  }

  removeChat(chatId: string): Promise<Chat> {
    return this.httpClient.delete<any>(this.baseURL + chatId, this.authService.getAuthHeaders()).toPromise();
  }
}
