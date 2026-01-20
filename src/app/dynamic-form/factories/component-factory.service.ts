import { Inject, Injectable } from '@angular/core';
import { TextInputComponent } from '../text-input/text-input.component';
import { EmailInputComponent } from '../email-input/email-input.component';
import { NumberInputComponent } from '../number-input/number-input.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { CheckboxInputComponent } from '../checkbox-input/checkbox-input.component';
import { RadioInputComponent } from '../radio-input/radio-input.component';
import { SelectComponent } from '../select/select.component';
import { DateInputComponent } from '../date-input/date-input.component';
import { FileInputComponent } from '../file-input/file-input.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentFactory {
  createComponent(selectedType: string) {
    switch (selectedType) {
      case 'text':
        return TextInputComponent
      case 'email':
        return EmailInputComponent
      case 'number':
        return NumberInputComponent
      case 'textarea':
        return TextareaComponent
      case 'checkbox':
        return CheckboxInputComponent
      case 'radio':
        return RadioInputComponent
      case 'select':
        return SelectComponent
      case 'date':
        return DateInputComponent
      case 'file':
        return FileInputComponent

      default:
        return TextInputComponent; // Fallback
    }
  }
}