import { R3ExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { AuthenticationService } from './authentication-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private wsEndpoint: string = environment.api_url + "/chatws";
  constructor(public authService: AuthenticationService) {
    this.connectWs();
   }
public stompClient:any;
public msg:any = [];

connectWs(){
  const ws = new SockJS(this.wsEndpoint);
  this.stompClient = Stomp.Stomp.over(ws);
  this.stompClient.connect(
    { Authorization: this.authService.currentTokenValue },
    ()=>{
    this.stompClient.subscribe('/topic/chatbot', (message:any)=> {
      if(message.body){
        this.msg.push(message.body);
      }
    });
  });
}

sendMessage(message:any){
  this.stompClient.send('/app/send/message', {},message);
}



}
