import { Injectable } from '@angular/core';
import { Hero } from "./interfaces/hero";
import { Observable, of } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl='api/heroes';

  private httpOptions = {
    headers: new HttpHeaders({"Content-Type": 'application\json'})
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /**
   * getHeroes
   */
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  /**
   * getHero
   */
  public getHero(id: Number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }


  public deleteHero(hero: Hero){

  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
