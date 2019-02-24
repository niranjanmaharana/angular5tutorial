import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './service/config.server';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular 5 Tutorial';
  showLoadingIndicator = true;
  arrBirds: string[];

  constructor(private _router: Router, private httpClient: HttpClient, private configServer: ConfigService) {
    this._router.events.subscribe((_routerEvent: Event) => {
      if (_routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      if (_routerEvent instanceof NavigationError
        || _routerEvent instanceof NavigationCancel
        || _routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }
    });
  }

  ngOnInit() {
    this.httpClient.get('./assets/JSON/birds.json').subscribe(
      data => {
        this.arrBirds = data as string[];	 // FILL THE ARRAY WITH DATA.
        console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

    // this.httpClient.get('./assets/config.json').subscribe(
    //   data => {
    //     this.configServer.setConfiguration(data as any);	 // FILL THE ARRAY WITH DATA.
    //     console.log(this.configServer.getConfiguration().apiUrl);
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log(err.message);
    //   }
    // );
  }
}
