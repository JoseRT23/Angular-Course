import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'products-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {
  
  @Input()
  public price: number = 0;
  public interval$?: Subscription;

  
  ngOnInit(): void {
    this.interval$ = interval(1000).subscribe(value => console.log(value));
    console.log('componenteHijo: ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log({changes});
    console.log('componenteHijo: ngOnChanges');
  }

  ngOnDestroy(): void {
    this.interval$?.unsubscribe();
    console.log('componenteHijo: ngOnDestroy');
  }
}
