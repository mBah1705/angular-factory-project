import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormField } from '../../components/dynamic-form.component';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './file-input.component.html',
})
export class FileInputComponent {
  field = input.required<FormField>();

  handleFileChange(event: any, field: FormField) {
    const file = event.target.files[0];
    if (file) {
      field.value = {
        name: file.name,
        size: file.size,
        type: file.type
      };
    }
  }
}
