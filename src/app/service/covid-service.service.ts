import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { tap, catchError, map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Covid } from '../model/covid'

@Injectable({
  providedIn: 'root'
})
export class CovidServiceService {

  url = "http://localhost:8080/covidcase"
  headers = new HttpHeaders().set('Content-type', 'application/json').set('Accept', 'application/json')
  httpOptions = {
    headers : this.headers
  }

  constructor(private http : HttpClient) { }

  private handleError(error : any){
    console.log(error)
    return throwError(error)
  }

  addCovid(covid : Covid) : Observable<Covid>{
    covid.idCase = null
    return this.http.post<Covid>(this.url, covid, this.httpOptions).pipe(
      tap(data => console.log(data),
      catchError(this.handleError)
      )
    )
  }

  getCovids() : Observable<Covid[]>{
    return this.http.get<Covid[]>(this.url)
  }

  updateCovids(covid : Covid) : Observable<Covid>{
    const url = `${this.url}/${covid.idCase}`
    return this.http.put<Covid>(this.url, covid, this.httpOptions).pipe(
      map(() => covid),
      catchError(this.handleError)
    )
  }

  deleteCovid(id : number) : Observable<Covid>{
    const url = `${this.url}/${id}`
    return this.http.delete<Covid>(this.url).pipe(
      catchError(this.handleError)
    )
  }

}
