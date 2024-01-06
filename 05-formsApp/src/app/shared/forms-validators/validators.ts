import { FormControl, ValidationErrors } from "@angular/forms";

export const validateUsername = (control: FormControl): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if (value !== 'strider')
        return null;

    return { usernameIsTaken: true };
}