import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    public validateUsername = (control: FormControl): ValidationErrors | null => {

        const value: string = control.value.trim().toLowerCase();
    
        if (value !== 'strider')
            return null;
    
        return { usernameIsTaken: true };
    }

    public isValidField(form: FormGroup, field: string): boolean | null {
        return form.controls[field].errors && form.controls[field].touched;
    }

    public isFielOneEqualFieldTwo(field1: string, field2: string) {
        return (formGroup: AbstractControl): ValidationErrors | null => {

            const fieldValue1 = formGroup.get(field1)?.value || '';
            const fieldValue2 = formGroup.get(field2)?.value || '';

            if (fieldValue1 !== fieldValue2) {
                formGroup.get(field2)?.setErrors({passwordsNotEquals: true});
                return { passwordsNotEquals: true };
            }

            if (formGroup.get(field2)?.hasError('passwordsNotEquals')) {
                delete formGroup.get(field2)?.errors?.['passwordsNotEquals'];
                formGroup.get(field2)?.updateValueAndValidity();                
            }

            return null;
        }
    }
}