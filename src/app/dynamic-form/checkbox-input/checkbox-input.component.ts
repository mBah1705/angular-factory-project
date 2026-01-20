import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormField } from '../../components/dynamic-form.component';

@Component({
  selector: 'app-checkbox-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox-input.component.html',
})
export class CheckboxInputComponent {
  field = input.required<FormField>();
}
