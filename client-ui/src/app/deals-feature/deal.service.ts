// deal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';
import { Deal } from './deal';
import { AuthService } from '../auth-feature/auth.service';
import { configdata } from 'configdata';

@Injectable()
export class DealService {
  // Define the routes we are going to interact with
  // private basePath = 'https://adub-nodejsapi-fluent-puku.apps.pcf.sandbox.cudirect.com';
  private publicDealsUrl = configdata.apiBaseUrl + '/api/deals/public';
  private privateDealsUrl = configdata.apiBaseUrl + '/api/deals/private';

  constructor(
      private http: HttpClient,
      private authService: AuthService) { }

  // Implement a method to get the public deals
  getPublicDeals() {
    console.log('Trying to get public deals');

    return this.http
      .get<Deal[]>(this.publicDealsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to get the private deals
  getPrivateDeals() {
    console.log('Trying to get private deals');

    return this.http
      .get<Deal[]>(this.privateDealsUrl, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return _throw(err.message || err);
  }

  purchase(item) {
    alert(`You bought the: ${item.name}`);
  }
}
