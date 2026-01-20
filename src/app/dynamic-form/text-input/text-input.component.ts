import { Component, input } from '@angular/core';
import { FormField } from '../../components/dynamic-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input 
      type="text"
      [(ngModel)]="field().value"
      [name]="field().id"
      class="form-control"
    />
  `,
})
export class TextInputComponent {
  field = input.required<FormField>();
}
