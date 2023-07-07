import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})

export class ByCapitalPageComponent implements OnInit {

  public capitals: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.capitals = this.countriesService.cachedStore.byCapital.countries;
    this.initialValue = this.countriesService.cachedStore.byCapital.term;
  }

  searchByCapital( term: string ): void {
    this.isLoading = true;
    this.countriesService.searchCapital(term)
    .subscribe(res => {
      this.capitals = res;
      this.isLoading = false;
      });
  };
}
