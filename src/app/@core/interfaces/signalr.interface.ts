import { Observable } from 'rxjs';

import { SignalrData } from './signalr-data.interface';

export interface SignalrInterface {
  getDataStream<T>(): Observable<SignalrData<T>>;
  sendData(action: string, data: any): void;
}
