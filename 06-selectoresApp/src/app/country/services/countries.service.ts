import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';
import { Observable, of, tap, map, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private _baseUrl: string = 'https://restcountries.com/v3.1';
    private _regions: Region[] = [Region.Africa, Region.America, Region.Asia, Region.Europe, Region.Oceania];

    constructor(
        private http: HttpClient
    ) { }
    
    public get regions() : Region[] {
        return [ ...this._regions ];
    }

    public getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {
        if(!region) return of([]);

        const url: string = `${this._baseUrl}/region/${region}?fields=cca3,name,borders`;
        return this.http.get<Country[]>(url)
            .pipe(
                map(countries => countries.map(country => ({
                    name: country.name.common,
                    cca3: country.cca3,
                    borders: country.borders ?? []
                }))),
            )
    }

    public getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
        const url: string = `${this._baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
        return this.http.get<Country>(url)
            .pipe(
                map( country => ({
                    name: country.name.common,
                    cca3: country.cca3,
                    borders: country.borders ?? []
                })),
            )
    }

    public getCountryBordersByCode(borders: string[]): Observable<SmallCountry[]> {
        if (!borders || borders.length === 0) return of([]);

        const countriesRequests: Observable<SmallCountry>[] = [];
        //Agrupar todos los observables en un array y luego resolverlos
        //con combineLatest
        borders.forEach(code => {
            const request = this.getCountryByAlphaCode(code);
            countriesRequests.push(request);
        });

        return combineLatest(countriesRequests);
    }
    
}