import { Directive, Input } from '@angular/core';
import { AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appCustomValidators]'
})
export class CustomValidatorsDirective implements Validator {

  @Input ('validateDate') shoulbeless: any;
  validate(control : AbstractControl): {[key: string]: any} | null{
    console.log(this.shoulbeless);
    console.log(control.value);
    const date =  new Date(control.value);
    console.log(date);
    
    return date;
  }
  constructor() { }

}
