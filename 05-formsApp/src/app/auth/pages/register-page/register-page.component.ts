import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from 'src/app/shared/forms-validators/email-validator.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
// import * as customValidators from 'src/app/shared/forms-validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public registerForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ new EmailValidator() ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ this.emailValidator ]],
    username: ['', [ Validators.required, this.validatorsService.validateUsername ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [
      this.validatorsService.isFielOneEqualFieldTwo('password', 'password2')
    ]
  });
  //cuando se ocupa validar mas de dos campos usar el objeto validators

  constructor(private fb: FormBuilder,
              private validatorsService: ValidatorsService,
              private emailValidator: EmailValidator) { }

  public isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.registerForm, field);
  }
    
  public onSubmit(): void {
    this.registerForm.markAllAsTouched();
  }

}
