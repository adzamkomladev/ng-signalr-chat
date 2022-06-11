import { Inject, Injectable } from '@angular/core';

import { filter, Observable, Subject } from 'rxjs';

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

import { SignalrInterface } from '../interfaces/signalr.interface';

import { SignalrData } from '../interfaces/signalr-data.interface';

@Injectable()
export class SignalrService implements SignalrInterface {
  private readonly signalrData!: Subject<SignalrData<any>>;
  private openConnection: boolean;
  private isInitializing: boolean;
  private hubConnection!: HubConnection;

  constructor(
    @Inject('PATH') private path: string,
    @Inject('EVENTS') private events: string[]
  ) {
    this.signalrData = new Subject<SignalrData<any>>();
    this.openConnection = false;
    this.isInitializing = true;
    this.initializeSignalR(path, events);
  }

  getDataStream<T>(...filterEvents: string[]): Observable<SignalrData<T>> {
    this.ensureConnection();

    return this.signalrData
      .asObservable()
      .pipe(filter((event) => filterEvents.some((f) => f === event.event)));
  }

  sendData(action: string, data: any): void {
    this.hubConnection.invoke(action, ...data);
  }

  private initializeSignalR(path: string, events: string[]): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7254/${path}`)
      .build();

    this.hubConnection
      .start()
      .then((_) => {
        this.openConnection = true;
        this.isInitializing = false;
        this.setupSignalREvents(events);
      })
      .catch((error) => {
        console.warn(error);
        this.hubConnection.stop().then((_) => {
          this.openConnection = false;
        });
      });
  }

  private setupSignalREvents(events: string[]) {
    events.forEach((event) =>
      this.hubConnection.on(event, (data) => this.onMessage({ event, data }))
    );
    this.hubConnection.onclose((e) => (this.openConnection = false));
  }

  private onMessage<T>(payload: SignalrData<T>) {
    this.signalrData.next(payload);
  }

  private ensureConnection() {
    if (this.openConnection || this.isInitializing) return;
    this.initializeSignalR(this.path, this.events);
  }
}
