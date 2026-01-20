import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormField } from '../../components/dynamic-form.component';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <input 
    type="number"
    [(ngModel)]="field().value"
    [name]="field().id"
    class="form-control"
  />
  `,
})
export class NumberInputComponent {
  field = input.required<FormField>();
}
