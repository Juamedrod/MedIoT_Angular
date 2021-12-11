import { Component, OnInit } from '@angular/core';
import { MessagesSystemService } from 'src/app/Services/messages-system.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private messageService: MessagesSystemService) { }

  ngOnInit(): void {
  }

  newMessage() {
    this.messageService.newMessage({
      message: 'que barbaridad de mensaje',
      messageType: Math.trunc(Math.random() * 3)
    });
  }

}
