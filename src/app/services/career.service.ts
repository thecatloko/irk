import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Career } from '../models/career';
import { Hability } from '../models/hability';
import { Magic } from '../models/magic';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class CareerService {
  
  //private careerUrl = 'api/heroes';  // URL to web api
  private careerUrl = 'http://www.robertosampaio.com/irk/service/career/';  // URL to web api
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
   
  getCareers(): Observable<Career[]> {
    return this.http.get<Career[]>(this.careerUrl)
      .pipe(
        tap(_ => this.log('fetched Careers')),
        catchError(this.handleError<Career[]>('getCareers', []))
      );
  }
  
  getHabilities(firstId: number, secondId: number): Observable<Hability[]> {
    const url = `${this.careerUrl}hability/?fId=${firstId}&sId=${secondId}`;
    return this.http.get<Hability[]>(url).pipe(
      tap(_ => this.log(`fetched Hability for Careers=${firstId}, ${secondId}`)),
      catchError(this.handleError<Hability[]>(`getHabilities for Careers=${firstId}, ${secondId}`))
    );
  }
  
  getMagics(firstId: number, secondId: number): Observable<Magic[]> {
    const url = `${this.careerUrl}magic/?fId=${firstId}&sId=${secondId}`;
    return this.http.get<Magic[]>(url).pipe(
      tap(_ => this.log(`fetched Magic for Careers=${firstId}, ${secondId}`)),
      catchError(this.handleError<Magic[]>(`getHabilities for Careers=${firstId}, ${secondId}`))
    );
  }
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CareerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CareerService: ${message}`);
  }
}