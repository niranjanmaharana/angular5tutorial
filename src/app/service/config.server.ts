import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigService {
    configUrl = './assets/config.json';
    apiUrl = '';
    configuration = null;

    getConfiguration(): any {
        return this.configuration;
    }

    setConfiguration(config) {
        this.configuration = config;
    }

    constructor(private http: HttpClient) {
        debugger;
        this.http.get('./assets/config.json').subscribe(
            data => {
                this.setConfiguration(data as any);
                this.apiUrl = this.getConfiguration().apiUrl;
                console.log(this.apiUrl);
            },
            (err: HttpErrorResponse) => {
                console.log(err.message);
            }
        );
    }

    getData() {
    }

    handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.log('Client side error or network issue : ' + errorResponse.message);
        } else {
            console.log('Server side error : ' + errorResponse.message);
        }
        return throwError('There is a problem with the service! We are notified and working on it. Please try again later.');
    }
}