import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';
import { Transfer } from '../model/Transfer';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Collection } from '../model/Collection';
import { JsonPipe } from '@angular/common';



export interface Transfers{
  trans:Transfer[];
}

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private http: HttpClient) { }

  // addcalc (u:User[]): Observable<Transfers> {
  //   return this.http.post<Transfers>('http://localhost:3000/api/test', u);
  // }

  addcalc (output:JSON): Observable<JSON> {
    
    var item = {
      "id":"123456",
      "data":output
    };

    var packet = JSON.stringify(item);
    
    console.log(packet);
    return this.http.post<JSON>('http://localhost:3000/api/test', packet);
  }

  // addCol (collection:Collection): Observable<string> {
  //   // return this.http.post<Collection>('http://localhost:3000/api/test', collection);
  //   var packet = {
  //     "id":"123456",
  //     "content":collection
  //   };
  //   console.log(packet);
    
  //   return this.http.post<string>('http://localhost:3000/api/test',JSON.stringify(packet)).subscribe( packet => console.log(packet.id));
  //   }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
