import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../custom/custom-validators";

@Injectable({
  providedIn: 'root'
})
export class SignupvalidationService {

  constructor(private fb: FormBuilder) { }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        username: [null, Validators.compose([
          Validators.required,
          Validators.minLength(5)])],
        // email is required and must be a valid email
        email: [null, Validators.compose([
          Validators.email,
          //Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),  //Email regex validation;
          Validators.required])
        ],
        password: [ null, Validators.compose([
          // 1. Password Field is Required
          Validators.required,
          // 2. check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          CustomValidators.patternValidator(/[^A-Za-z0-9]{3}/, { hasSpecialCharacters: true }),
          // 6. Has a minimum length of 8 characters
          Validators.minLength(8)])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      });
  }
}
