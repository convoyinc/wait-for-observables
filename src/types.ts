// TODO: Remove once this makes its way into standard typings.
export interface Observable {
  subscribe(observer: Observer<any>): Subscription;
}

export interface Observer<TValue> {
  next?(value: TValue): void;
  error?(error: any): void;
  complete?(): void;
}

export interface Subscription {}
