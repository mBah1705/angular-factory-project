import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormField } from '../../components/dynamic-form.component';

@Component({
  selector: 'app-radio-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-input.component.html',
})
export class RadioInputComponent {
  field = input.required<FormField>();
}
