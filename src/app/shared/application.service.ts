import { Injectable } from '@angular/core';

@Injectable()
export class Application {
  _apiUrl: string;

  set apiUrl(apiUrl: string) {
    this._apiUrl = apiUrl;
  }
  get apiUrl(): string {
    return this.apiUrl;
  }
}
