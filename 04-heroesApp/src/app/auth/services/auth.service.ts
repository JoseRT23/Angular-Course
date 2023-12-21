import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient,
              private router: Router) { }

  public get currentUser() : User|undefined {
    if(!this.user) return undefined;
    return structuredClone( this.user );
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(() => localStorage.setItem('token', 'adaAkds324qam'))
      );
  }

  public checkAuthentication(): Observable<boolean> {
     if(!localStorage.getItem('token')) return of(false);
     const token = localStorage.getItem('token');
     
     return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      )
  }

  public logout() {
    this.user = undefined;
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  
}
