import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private _apiUrl: string = 'https://restcountries.com/v3.1/'
  get params() {
    return new HttpParams().set('fields', 'name,capital,cca2,flags,population,translations,region');
  }
  constructor(private http: HttpClient) { }
  buscarPais(termino: string, tipo: string): Observable<Country[]> {

    const url = `${this._apiUrl}${tipo}/${termino}`;
    return this.http.get<Country[]>(url, { params: this.params });
  }

  getPaisPorcodigo(codigo: string): Observable<Country[]> {

    const url = `${this._apiUrl}alpha/${codigo}`;
    return this.http.get<Country[]>(url);
  }
  sugerencias(termino: string): Observable<Country[]> {

    const url = `${this._apiUrl}name/${termino}`;
    return this.http.get<Country[]>(url, { params: this.params });
  }
}
