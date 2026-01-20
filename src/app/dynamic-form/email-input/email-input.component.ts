import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormField } from '../../components/dynamic-form.component';

@Component({
  selector: 'app-email-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input 
      type="email"
      [(ngModel)]="field().value"
      [name]="field().id"
      class="form-control"
    />
  `,
})
export class EmailInputComponent {
  field = input.required<FormField>();
}
