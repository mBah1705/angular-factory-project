import { Injectable } from '@angular/core';
import { FormField } from '../../components/dynamic-form.component';


interface CreateFormFieldInterface {
  createFormField(label: string): FormField;
  validateFormField(value: any): boolean;
}

abstract class BaseFormField implements CreateFormFieldInterface {
  protected type: string;
  protected baseFormField: FormField;

  constructor(type: string, idCounter: number) {
    this.type = type;
    this.baseFormField = {
      id: 'field_' + idCounter,
      type: this.type,
      label: '',
      value: null
    };
  }

  abstract createFormField(label: string): FormField;
  abstract validateFormField(field: FormField): boolean;

}

class TextInputField extends BaseFormField {
  override type: string = 'text';
  createFormField(label: string): FormField {
    return {
        ...this.baseFormField,
        label: label
      };
  }

  validateFormField(field: FormField): boolean {
    if (!field.value || field.value.trim() === '') {
          alert(`Le champ "${field.label}" est requis`);
          return false;
        }

    return true;
  }
}

class EmailInputField extends BaseFormField {
  override type: string = 'email';
  createFormField(label: string): FormField {
    return {
        ...this.baseFormField,
        label: label
      };
  }

  validateFormField(field: FormField): boolean {
    if (!field.value || !field.value.includes('@')) {
          alert(`Email invalide pour "${field.label}"`);
          return false;
        }

    return true;
  }
}

class NumberInputField  extends BaseFormField {
  override type: string = 'number';
  createFormField(label: string): FormField {
    return {
        ...this.baseFormField,
        label: label
    };
  }

  validateFormField(field: FormField): boolean {
    if (field.value === null || field.value === undefined) {
          alert(`Le champ "${field.label}" est requis`);
          return false;
        }
    return true;
  }
}

class TextareaField extends BaseFormField {
  override type: string = 'textarea';
  createFormField(label: string): FormField {
    return {
        ...this.baseFormField,
        label: label
    };
  }

  validateFormField(field: FormField): boolean {
    if (!field.value || field.value.trim() === '') {
          alert(`Le champ "${field.label}" est requis`);
          return false;
        }
    return true;
  }
}

class CheckboxField  extends BaseFormField {
  override type: string = 'checkbox';
  createFormField(label: string): FormField {
    return {
        ...this.baseFormField,
        label: label,
        value: false
    };
  }
  validateFormField(field: FormField): boolean {
    return true;
  }
}

class RadioField  extends BaseFormField {
  override type: string = 'radio';
  createFormField(label: string): FormField {
    return {
        ...this.baseFormField,
        label: label,
        options: ['Option 1', 'Option 2', 'Option 3'],
        value: ''
    };
  }
  validateFormField(field: FormField): boolean {
    if (!field.value) {
          alert(`Veuillez sélectionner une option pour "${field.label}"`);
          return false;
        }
    return true;
  }
}

class SelectField  extends BaseFormField {
  override type: string = 'select';
  createFormField(label: string): FormField {
    return {
        ...this.baseFormField,
        label: label,
        options: ['Choix 1', 'Choix 2', 'Choix 3'],
        value: ''
    };
  }
  validateFormField(field: FormField): boolean {
    if (!field.value) {
          alert(`Veuillez sélectionner une option pour "${field.label}"`);
          return false;
        }
    return true;
  }
}

class DateField  extends BaseFormField {
  override type: string = 'date';
  createFormField(label: string): FormField {
    return {
        ...this.baseFormField,
        label: label,
        value: ''
    };
  }
  validateFormField(field: FormField): boolean {
    if (!field.value) {
          alert(`Le champ "${field.label}" est requis`);
          return false;
        }
    return true;
  }
}

class FileField  extends BaseFormField {
  override type: string = 'file';
  createFormField(label: string): FormField {
    return {
        ...this.baseFormField,
        label: label,
        value: null
    };
  }
  validateFormField(field: FormField): boolean {
    if (!field.value) {
          alert(`Veuillez sélectionner un fichier pour "${field.label}"`);
          return false;
        }
    return true;
  }
}

export abstract class FieldCreator {
  type = '';
  label = '';
  formFields: FormField[] = [];
  protected components: BaseFormField[] = [];

  submittedData: any = null;

  abstract createField(type: string, label: string): FormField | undefined;
  abstract validateField(field: FormField, id: number): boolean


  addField(): void {
    const generatedField = this.createField(this.type, this.label) ?? null;
    if (generatedField) {
      this.formFields.push(generatedField);
    }
  }
  
  removeField(id: string) {
    const indexToRemove = this.formFields.findIndex(field => field.id === id)
    if(indexToRemove > -1) {
      this.formFields.splice(indexToRemove, 1)
      this.removeComponent(indexToRemove)
    }
  }

  private removeComponent(index: number) {
    this.components.splice(index, 1)
  }

  
  submitForm() {
    const data: any = {};

    for (const [index, field] of this.formFields.entries()) {     
      if(!this.validateField(field, index))
        return

        if(typeof field.value === 'string') {
          data[field.id] = field.value.trim();
        } else if(typeof field.value === 'number') {
          data[field.id] = Number(field.value);
        } else if (typeof field.value === 'boolean') {
          data[field.id] = Boolean(field.value);
        } else {
          data[field.id] = field.value;
        }
    }

    this.submittedData = data;
    console.log('Formulaire soumis:', data);
  }
}

@Injectable({
  providedIn: 'root'
})
export class FieldFactory extends FieldCreator {
  private fieldCounter = 0;
  override components: BaseFormField[] = []

  createField(type: string, label: string): FormField| undefined {

  let component: BaseFormField

    if (!label.trim()) {
      alert('Veuillez entrer un label');
      return;
    }
    switch (type) {
      case 'text':
        component =  new TextInputField(type, this.fieldCounter)
        this.components.push(component)
        return this.incrementCounterAndCreate(component, label)

      case 'email':
        component = new EmailInputField(type, this.fieldCounter)
        this.components.push(component)
        return this.incrementCounterAndCreate(component, label)

      case 'number':
        component = new NumberInputField(type, this.fieldCounter)
        this.components.push(component)
         return this.incrementCounterAndCreate(component, label)

      case 'textarea':
        component = new TextareaField(type, this.fieldCounter)
        this.components.push(component)
        return this.incrementCounterAndCreate(component, label)

      case 'checkbox':
        component = new CheckboxField(type, this.fieldCounter)
        this.components.push(component)
        return this.incrementCounterAndCreate(component, label)

      case 'radio':
        component = new RadioField(type, this.fieldCounter)
        this.components.push(component)
        return this.incrementCounterAndCreate(component, label)

      case 'select':
        component = new SelectField(type, this.fieldCounter)
        this.components.push(component)
        return this.incrementCounterAndCreate(component, label)

      case 'date':
        component = new DateField(type, this.fieldCounter)
        this.components.push(component)
        return this.incrementCounterAndCreate(component, label)

      case 'file':
        component = new FileField(type, this.fieldCounter)
        this.components.push(component)
        return this.incrementCounterAndCreate(component, label)

      default:
        throw new Error(`Unsupported field type: ${type}`);
    }
  }

  incrementCounterAndCreate(component: BaseFormField, label: string) {
    this.fieldCounter++
    return component.createFormField(label)
  }

  validateField(field: FormField, index: number): boolean {
    return this.components[index].validateFormField(field)
  }
}
