import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: ['']
})
export class BasicPageComponent implements OnInit {

  public basicForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    price: [0, [ Validators.required, Validators.min(0) ]],
    inStorage: [0, [ Validators.required, Validators.min(0) ]],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.basicForm.reset({
    //   name: 'test',
    //   price: 2,
    //   inStorage: 5
    // })
  }

  
  public isValidField(field: string) {
    return this.basicForm.controls[field].errors 
      && this.basicForm.controls[field].touched;
  }

  public getFieldError(field: string): string | null {
    if (!this.basicForm.controls[field]) return null;

    const errors = this.basicForm.controls[field].errors || {};

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

  public onSave(): void {
    this.basicForm.markAllAsTouched();
    if (this.basicForm.invalid) return;
    console.log(this.basicForm.value);
    this.basicForm.reset({ price: 0, inStorage: 0 });
  }
}
