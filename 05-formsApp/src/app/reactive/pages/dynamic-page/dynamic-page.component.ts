import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public dynamicForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    favoriteGames: this.fb.array([
      ['FIFA', Validators.required],
      ['GTA V', Validators.required]
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);
  constructor(private fb: FormBuilder) { }

  
  public get favoriteGames() : FormArray {
    return this.dynamicForm.get('favoriteGames') as FormArray;
  }

  public isValidField(field: string) {
    return this.dynamicForm.controls[field].errors 
      && this.dynamicForm.controls[field].touched;
  }

  public isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  public getFieldError(field: string): string | null {
    if (!this.dynamicForm.controls[field]) return null;

    const errors = this.dynamicForm.controls[field].errors || {};

    for(let key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }

    return null;
  } 

  public onAddToFavorites(): void {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value.toUpperCase();
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavorite.reset();
  }

  public onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  public onSubmit(): void {
    this.dynamicForm.markAllAsTouched();
    if (this.dynamicForm.invalid) return;
    console.log(this.dynamicForm.value);
    this.dynamicForm.reset();
    (this.dynamicForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
  }

}
