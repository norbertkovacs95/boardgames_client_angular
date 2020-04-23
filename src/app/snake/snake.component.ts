import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import * as io from 'socket.io-client';
import { Socket } from 'net';
import { TokenService } from '../services/token.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit,OnDestroy {


  private inviteId: string;
  private partyId: string;
  private haveParty: boolean = false;
  private haveInvite: boolean = false;

  constructor(
    private socketService: SocketService) {

  }

  ngOnInit() {
    this.socketService.onOnlinePlayers()
      .subscribe((users) => {
        console.log(users);
      });

    this.socketService.onInvitation()
      .subscribe((resp) => {
        console.log(`${resp.username} invited you to play snake`);
        this.haveInvite = true;
        this.inviteId = resp.inviteId;
      });

    this.socketService.onInviteAccepted()
      .subscribe((partyId) => {
        this.inviteId = "";
        this.partyId = partyId;
        this.haveInvite = false;
        this.haveParty = true;
        console.log('Party created, id: ', partyId);
      });
    
    this.socketService.onInviteDeclined()
      .subscribe((username) => {
        this.inviteId = "";
        this.haveInvite = false;
        console.log(`${username} declined your invite`);
      });
    
    this.socketService.onPartyLeft()
      .subscribe(() => {
        this.partyId = "";
        this.haveParty = false;
        console.log('Your party is closed')
      })
  }

  ngOnDestroy() {
    this.socketService.disconnectSocket();
  }

  sendInvite() {
    if(!this.haveInvite) {
      this.socketService.emitInvite('Evelin');
      this.haveInvite = true;
    }
  }

  getOnlinePlayers() {
    this.socketService.emitOnlinePlayers();
  }

  acceptInvite() {
    if(this.haveInvite) {
      this.socketService.emitAcceptInvite(this.inviteId);
      this.haveInvite = false;
    }
  }

  declineInvite() {
    if(this.haveInvite) {
      this.socketService.emitDeclineInvite(this.inviteId);
      this.haveInvite = false;
    }
  }

  leaveParty() {
    if (this.haveParty) {
      this.socketService.emitLeaveParty(this.partyId);
      this.haveParty = false;
    }
  }
}
