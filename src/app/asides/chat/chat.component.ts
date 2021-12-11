import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/Interfaces/chat.interface';
import { msgType } from 'src/app/Interfaces/message.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { ChatService } from 'src/app/Services/chat.service';
import { MessagesSystemService } from 'src/app/Services/messages-system.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  newResponse: string;
  inputNewTopic: string;
  arrChats: Chat[];
  userID: any;

  constructor(private messageService: MessagesSystemService, private chatService: ChatService, private authService: AuthService) {
    this.arrChats = [];
    this.userID = '';
    this.newResponse = '';
    this.inputNewTopic = '';
  }

  async ngOnInit() {
    this.arrChats = await this.chatService.getAll();
    this.userID = this.authService.getUser().id;
  }

  /**
   * Create a new Topic, the message is given via ngModel
   */
  async newTopic() {
    try {
      const newTopic = await this.chatService.newChat(this.inputNewTopic);
      this.arrChats.push(newTopic);
      this.inputNewTopic = '';
      this.messageService.newMessage({ message: 'Topic created successfully', messageType: msgType.success });
    } catch (error) {
      this.messageService.newMessage({ message: 'Error creating a new Topic', messageType: msgType.error });
    }
  }

  /**
   * Send a response to this specific topic
   * @param chatId db Id for the topic 
   * @param message the message you want to send
   */
  async responseToTopic(chatId: string, message: string) {
    try {
      const newResponse = await this.chatService.newResponse(chatId, message);
      this.arrChats = this.arrChats.map(chat => {
        if (chat._id !== newResponse._id) return chat;
        return newResponse;
      });
      this.newResponse = '';
      this.messageService.newMessage({ message: 'Response created successfully', messageType: msgType.success });
    } catch (error) {
      this.messageService.newMessage({ message: 'Error creating the response', messageType: msgType.error });
    }
  }

  /**Delete a topic after check the user authority */
  async onDelete(chatId: string) {
    try {
      await this.chatService.removeChat(chatId);
      this.arrChats = await this.chatService.getAll();
      this.messageService.newMessage({ message: 'Topic removed successfully', messageType: msgType.success });
    } catch (error) {
      this.messageService.newMessage({ message: 'Error removing the topic', messageType: msgType.error });
    }
  }

  /**
   * TrackBy function callback to avoid the ngFor to render the entire dom when a value of the array change.
   * @param index index in the iterable
   * @param item item in the iteration
   * @returns item id
   */
  trckByIdentify(index: number, item: any) {
    return item._id;
  }
}
