import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {}
  
  public get arrTags() : string[] {
    return this.gifsService.tagsHistory
  }
  
  public searchGif(text:string): void {
    this.gifsService.searchTag(text);
  }
}
