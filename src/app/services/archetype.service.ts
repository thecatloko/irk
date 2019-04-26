import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Archetype } from '../models/archetype';
import { ArchetypeBenefit } from '../models/archetypeBenefit';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class ArchetypeService {
  
  private archetypeUrl = 'http://www.robertosampaio.com/irk/service/archetype/';  // URL to web api
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
   
  getAchetypes(): Observable<Archetype[]> {
    return this.http.get<Archetype[]>(this.archetypeUrl)
      .pipe(
        tap(_ => this.log('fetched Archetypes')),
        catchError(this.handleError<Archetype[]>('getAchetypes', []))
      );
  }
  
  getAchetypeBenefits(id: number): Observable<ArchetypeBenefit[]> {
    const url = `${this.archetypeUrl}benefits/?id=${id}`;
    return this.http.get<ArchetypeBenefit[]>(url).pipe(
      tap(_ => this.log(`fetched ArchetypeBenefit for Archetype=${id}`)),
      catchError(this.handleError<ArchetypeBenefit[]>(`getAchetypeBenefits Archetype=${id}`))
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

  /** Log a ArchetypeService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ArchetypeService: ${message}`);
  }
}