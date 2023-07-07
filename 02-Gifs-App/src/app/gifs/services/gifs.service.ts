import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Gif, SerchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private _APIKEY: string = 'PgGU5AjvHxnaPZyVLFqFJQ40E9kt3xqN';
  private _SERVICE_URL: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { 
    this.loadLocalStorage();
   }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);      
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,5);
    this.saveLocalStorage();
  };

  private saveLocalStorage(): void {
    localStorage.setItem('tagHistory', JSON.stringify(this.tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('tagHistory')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('tagHistory')!);

    if(this.tagsHistory.length === 0) return;

    this.searchTag(this.tagsHistory[0]);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    const params = new HttpParams()
      .set('api_key', this._APIKEY)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SerchResponse>(`${this._SERVICE_URL}/search?${params}`)
      .subscribe(res => {
        this.gifList = res.data;
      })
    tag = tag.trim();
    this.organizeHistory(tag);
  };
}
