import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  input:any;
  messageList:any = [];
  message:any;
  constructor(private wsService:WebsocketService) {
    this.messageList = this.wsService.msg;
  }


  ngOnInit(): void {

  }
  sendMessage(){
    if(this.input){
      this.wsService.sendMessage(this.input);
      this.input= '';
    } else{
      alert("Mesaj Giriniz.");
    }
  }
}
