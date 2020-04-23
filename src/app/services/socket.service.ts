import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as io from 'socket.io-client';
import { TokenService } from '../services/token.service';
import { baseURL } from '../shared/baseUrl';
import { of, fromEvent, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators' 

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = baseURL;
  private socket: SocketIO.Socket;

  constructor(
    private tokenService: TokenService,
    private router: Router) {

      this.socket = io(this.url);
      let token = tokenService.getJWT();
      
      this.socket.on('connect', () => {
        this.socket
          .on('authenticated', (socket) => {
            //asd
          })
          .on('unauthorized', (error) => {
            if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
              router.navigate(['/login']);
            }
          })
          .emit('authenticate', {token: token}); //send the jwt
      });
  }


  onOnlinePlayers():Observable<string[]> {
    return Observable.create((observer) => {
      this.socket.on('aviable players', data => observer.next(data));
    })
  }

  onInvitation():Observable<any> {
    return Observable.create((observer) => {
      this.socket.on('invitation', data => observer.next(data));
    })
  }

  onInviteAccepted():Observable<string> {
    return Observable.create((observer) => {
      this.socket.on('invite accepted', data => observer.next(data));
    })
  }

  onInviteDeclined():Observable<string> {
    return Observable.create((observer) => {
      this.socket.on('invite declined', data => observer.next(data));
    })
  }

  onPartyLeft():Observable<any> {
    return Observable.create((observer) => {
      this.socket.on('party left', data => observer.next(data));
    })
  }

  emitOnlinePlayers():void {
    this.socket.emit('aviable players');
  }

  emitInvite(username:string):void {
    this.socket.emit('invite', username);
  }

  emitAcceptInvite(inviteId: string):void {
    this.socket.emit('accept invite', inviteId);
  }

  emitDeclineInvite(inviteId: string):void {
    this.socket.emit('decline invite', inviteId);
  }

  emitLeaveParty(partyId: string): void {
    this.socket.emit('leave party', partyId);
  }

  disconnectSocket():void {
    this.socket.disconnect();
  }

}
