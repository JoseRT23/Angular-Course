import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-alone',
  imports: [ CounterAloneComponent, SideMenuComponent ],
  standalone: true,
  templateUrl: './alone.component.html',
  styleUrls: ['./alone.component.css']
})
export class AloneComponent {

}
