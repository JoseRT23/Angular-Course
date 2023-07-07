import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cachedStore.byCountries.countries;
    this.initialValue = this.countriesService.cachedStore.byCountries.term;
  }
  
  searchByCountry( term: string ): void {
    this.countriesService.searchCountry(term)
      .subscribe(res => this.countries = res);
  };

}
