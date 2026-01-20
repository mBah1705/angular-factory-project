import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormField } from '../../components/dynamic-form.component';


@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <textarea
    [(ngModel)]="field().value"
    [name]="field().id"
    class="form-control"
    rows="4"
  ></textarea>
  `,
})
export class TextareaComponent {
  field = input.required<FormField>();
}
