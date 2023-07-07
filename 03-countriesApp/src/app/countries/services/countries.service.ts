import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';
  public cachedStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  constructor(private http: HttpClient) {
    this.loadToLocalStorage();
   }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cachedStore));
  }

  private loadToLocalStorage(): void {
    if (!localStorage.getItem('cacheStore')) return;
    this.cachedStore = JSON.parse(localStorage.getItem('cacheStore')!);
  };

  private countryHttpRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  };
  
  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  };

  searchCapital( q: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${q}`;
    return this.countryHttpRequest(url)
      .pipe(
        tap( countries => this.cachedStore.byCapital = { term: q, countries}),
        tap(() => this.saveToLocalStorage()),
      )
  };

  searchCountry( q: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${q}`;
    return this.countryHttpRequest(url)
      .pipe(
        tap( countries => this.cachedStore.byCountries = { term: q, countries}),
        tap(() => this.saveToLocalStorage()),
      )
  };

  searchRegion( q: Region ): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${q}`;
    return this.countryHttpRequest(url)
    .pipe(
      tap( countries => this.cachedStore.byRegion = { region: q, countries}),
      tap(() => this.saveToLocalStorage()),
    )
  };
}
