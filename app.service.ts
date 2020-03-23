import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import { UserQuery } from "./Model/App.Model";
import { FormDigest } from './Model/App.Response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json;odata=verbose' })
};

const PEOPLE_PICKER_URL =
  '/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.ClientPeoplePickerSearchUser';

@Injectable()
export class AppService {
  private siteURL = 'https://incyte.sharepoint.com/sites/Dev';

  RequestDigest: string;

  constructor(
    private _http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error('Verbose Logging'); // log to console instead
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      //return of(result as T);
      return Observable.throw(error.error.error.message.value);
    };
  }

  private log(message: string) {
    console.log('AppService: ' + message);
  }

  getUserResponse(query: UserQuery): Observable<any> {
    const appweburl = this.siteURL + '/_api/contextinfo';
    const httpURL = this.siteURL + PEOPLE_PICKER_URL;
    //const data = JSON.stringify(query);
    return this._http.post(appweburl, '').pipe(
      mergeMap((xRequest: FormDigest) => {
        const digest = xRequest.FormDigestValue;
        const headers = new HttpHeaders({
          accept: 'application/json;odata=verbose',
          'X-RequestDigest': digest
        });
        const httpOptions = {
          headers: headers
        };
        return this._http.post(httpURL, query, httpOptions).pipe(
          tap(httpres => this.log('Fetched Data')),
          catchError(this.handleError('Get Users', []))
        );
      })
    );
  }
}

