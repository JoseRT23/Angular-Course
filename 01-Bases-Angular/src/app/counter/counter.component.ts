import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-counter',
    template: `
        <h1>Contador</h1>
        <p>Contador: {{counter}}</p>
        <button (click)="changeCounterValue(1)">+1</button>
        <button (click)="changeCounterValue(-1)">-1</button>
        <button (click)="resetCounter()">Reset</button>
    `
})

export class CounterComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    public counter: number = 0;

    changeCounterValue(n: number): void {
      this.counter += n;
    };
  
    resetCounter(): void {
      this.counter = 0;
    };
}