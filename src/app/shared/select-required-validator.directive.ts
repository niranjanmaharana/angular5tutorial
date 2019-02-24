import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appSelectValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SelectRequiredValidatorDirective,
    multi: true
  }]
})

export class SelectRequiredValidatorDirective implements Validator {
  /* custom validator with custom select default value */
  @Input() appSelectValidator: number;
  validate(control: AbstractControl): { [key: string]: any } | null {
    return control.value == this.appSelectValidator ? { 'default': true } : null;
  }

  /* custom validator with static value for select field */

  // validate(control: AbstractControl): { [key: string]: any } | null {
  //   console.log('control.value : ' + control.value);
  //   return control.value === '-1' ? { 'default': true } : null;
  // }

}
