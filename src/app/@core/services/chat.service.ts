import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { SignalrService } from './signalr.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends SignalrService {
  constructor() {
    super('chat', ['ReceiveMessage']);
  }

  public sendMessage(user: string, message: string): void {
    this.sendData('SendMessage', [user, message]);
  }

  public getCurrentMessage(): Observable<string> {
    return this.getDataStream<string>('ReceiveMessage').pipe(
      map((data) => data.data)
    );
  }
}
