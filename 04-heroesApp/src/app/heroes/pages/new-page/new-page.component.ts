import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  constructor(private _heroesService: HeroesService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _snacknar: MatSnackBar,
              public dialog: MatDialog) { }
  
  ngOnInit(): void {

    if (!this._router.url.includes('edit')) return;
    
    this._activatedRoute.params
    .pipe(
      switchMap(({id}) => this._heroesService.getHeroById(id)),
    ).subscribe( hero => {
      if (!hero) return this._router.navigateByUrl('/');
      
      this.heroForm.reset(hero);
      return;
    })
  }
  
  public get currentHero() : Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  public heroForm = new FormGroup({
    id:        new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img:    new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC-Comics' },
    { id: 'Marvel Comics', desc: 'Marvel-Comics' }
  ]

  onSubmit(): void {
    if (!this.heroForm.valid) return;

    if (this.currentHero.id) {
      this._heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar(`${hero.superhero} updated!`);
        });
        
        return;
      }
      
      this._heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        this._router.navigate(['/heroes/edit', hero.id]);
        this.showSnackbar(`${hero.superhero} created!`);
      });
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (!result) return;

    //   this._heroesService.deleteHeroById(this.currentHero.id)
    //     .subscribe( wasDeleted => {
    //       if (wasDeleted) {
    //         this._router.navigate(['/heroes']);
    //         console.log('deleted');            
    //       }
    //     })
    // });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this._heroesService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted),
      )
      .subscribe(() => {
        this._router.navigate(['/heroes']);
      })
  }

  showSnackbar(message: string): void {
    this._snacknar.open(message, 'done', {
      duration: 2500
    })
  }
}
