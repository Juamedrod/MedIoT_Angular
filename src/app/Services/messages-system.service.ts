import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message, msgType } from '../Interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessagesSystemService {

  private newMsg$: Subject<Message>;

  constructor() {
    this.newMsg$ = new Subject();
  }

  messageSubscription() {
    return this.newMsg$.asObservable();
  }

  newMessage(message: Message) {
    message.iat = new Date();
    this.newMsg$.next(message);
  }
}
