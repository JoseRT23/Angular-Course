import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public switchForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  public person = {
    gender: 'F',
    wantNotifications: true
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.switchForm.reset(this.person);
  }

  public isValidField(field: string) {
    return this.switchForm.controls[field].errors 
      && this.switchForm.controls[field].touched;
  }

  public onSubmit(): void {
    this.switchForm.markAllAsTouched();
    if(this.switchForm.invalid) return;

    const { termsAndConditions, ...newPerson } = this.switchForm.value;
    this.person = newPerson;
    console.log(this.person);
    console.log(this.switchForm.value);
  }

}
