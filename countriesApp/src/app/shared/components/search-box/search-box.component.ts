import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  
  
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';
  
  @Output()
  public onDebounce = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(500)  //espera cierto tiempopara hacer una petición
      )
      .subscribe(value => {
        this.onDebounce.emit(value)
      })
    } 

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  // @Output()
  // public onValue = new EventEmitter<string>();

  // emitValue(query: string): void {
  //   this.onValue.emit(query)
  // };

  onKeyPress(serchTerm: string): void {
    this.debouncer.next(serchTerm);
  };

}
