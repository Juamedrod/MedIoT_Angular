import { Component, OnInit } from '@angular/core';
import { Message } from '../Interfaces/message.interface';
import { MessagesSystemService } from '../Services/messages-system.service';

@Component({
  selector: 'messages-system',
  templateUrl: './messages-system.component.html',
  styleUrls: ['./messages-system.component.css']
})
export class MessagesSystemComponent implements OnInit {

  arrMessages: Message[];
  toastReferences: any = [];

  constructor(private messagesService: MessagesSystemService) {
    this.arrMessages = [];
  }

  ngOnInit(): void {
    this.messagesService.messageSubscription().subscribe((message => {
      this.arrMessages.push(message);
      setTimeout(() => {
        this.arrMessages.shift();
      }, 6000);
    }));
  }

}
