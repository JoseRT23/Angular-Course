import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{

  public regions: Country[] = [];
  public arrRegions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesService ) { }

  ngOnInit(): void {
    this.regions = this.countriesService.cachedStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cachedStore.byRegion.region;
  }
  
  searchByRegion( term: Region ): void {
    this.selectedRegion = term;
    this.countriesService.searchRegion(term)
      .subscribe(res => this.regions = res);
  };

}
