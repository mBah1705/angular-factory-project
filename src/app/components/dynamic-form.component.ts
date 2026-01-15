import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormField {
  id: string;
  type: string;
  label: string;
  value: any;
  options?: string[];
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dynamic-form">
      <h2>Générateur de Formulaire Dynamique</h2>
      
      <div class="form-builder">
        <h3>Ajouter un champ</h3>
        <select [(ngModel)]="selectedFieldType" class="form-control">
          <option value="text">Texte</option>
          <option value="email">Email</option>
          <option value="number">Nombre</option>
          <option value="textarea">Zone de texte</option>
          <option value="checkbox">Case à cocher</option>
          <option value="radio">Boutons radio</option>
          <option value="select">Liste déroulante</option>
          <option value="date">Date</option>
          <option value="file">Fichier</option>
        </select>
        
        <input 
          [(ngModel)]="fieldLabel" 
          placeholder="Label du champ"
          class="form-control"
        />
        
        <button (click)="addField()" class="btn-add">
          Ajouter le champ
        </button>
      </div>

      <div class="preview-form">
        <h3>Prévisualisation du formulaire</h3>
        <form>
          <div *ngFor="let field of formFields" class="field-wrapper">
            <label>{{ field.label }}</label>
            
            <!-- PROBLÈME: Énorme bloc de *ngIf pour gérer les types -->
            <input 
              *ngIf="field.type === 'text'"
              type="text"
              [(ngModel)]="field.value"
              [name]="field.id"
              class="form-control"
            />
            
            <input 
              *ngIf="field.type === 'email'"
              type="email"
              [(ngModel)]="field.value"
              [name]="field.id"
              class="form-control"
            />
            
            <input 
              *ngIf="field.type === 'number'"
              type="number"
              [(ngModel)]="field.value"
              [name]="field.id"
              class="form-control"
            />
            
            <textarea
              *ngIf="field.type === 'textarea'"
              [(ngModel)]="field.value"
              [name]="field.id"
              class="form-control"
              rows="4"
            ></textarea>
            
            <div *ngIf="field.type === 'checkbox'" class="checkbox-wrapper">
              <input 
                type="checkbox"
                [(ngModel)]="field.value"
                [name]="field.id"
                [id]="field.id"
              />
              <label [for]="field.id">{{ field.label }}</label>
            </div>
            
            <div *ngIf="field.type === 'radio'" class="radio-group">
              <div *ngFor="let option of field.options" class="radio-option">
                <input 
                  type="radio"
                  [name]="field.id"
                  [value]="option"
                  [(ngModel)]="field.value"
                  [id]="field.id + '_' + option"
                />
                <label [for]="field.id + '_' + option">{{ option }}</label>
              </div>
            </div>
            
            <select
              *ngIf="field.type === 'select'"
              [(ngModel)]="field.value"
              [name]="field.id"
              class="form-control"
            >
              <option value="">Sélectionner...</option>
              <option *ngFor="let option of field.options" [value]="option">
                {{ option }}
              </option>
            </select>
            
            <input 
              *ngIf="field.type === 'date'"
              type="date"
              [(ngModel)]="field.value"
              [name]="field.id"
              class="form-control"
            />
            
            <input 
              *ngIf="field.type === 'file'"
              type="file"
              [name]="field.id"
              class="form-control"
              (change)="handleFileChange($event, field)"
            />
            
            <button 
              type="button" 
              (click)="removeField(field.id)" 
              class="btn-remove"
            >
              Supprimer
            </button>
          </div>
        </form>
        
        <button 
          *ngIf="formFields.length > 0"
          (click)="submitForm()" 
          class="btn-submit"
        >
          Soumettre
        </button>
      </div>

      <div *ngIf="submittedData" class="submitted-data">
        <h3>Données soumises</h3>
        <pre>{{ submittedData | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .dynamic-form {
      max-width: 900px;
      margin: 0 auto;
      padding: 30px;
    }
    .form-builder {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
      display: flex;
      gap: 10px;
      align-items: flex-end;
    }
    .form-builder h3 {
      width: 100%;
      margin: 0 0 15px 0;
    }
    .form-control {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      font-family: inherit;
    }
    .btn-add {
      background: #2196F3;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
    }
    .preview-form {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .field-wrapper {
      margin-bottom: 20px;
      padding: 15px;
      background: #fafafa;
      border-radius: 4px;
      position: relative;
    }
    .field-wrapper label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #555;
    }
    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .checkbox-wrapper input {
      width: auto;
    }
    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .radio-option {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .radio-option input {
      width: auto;
    }
    .btn-remove {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #f44336;
      color: white;
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }
    .btn-submit {
      background: #4CAF50;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;
      width: 100%;
    }
    .submitted-data {
      margin-top: 30px;
      background: #e8f5e9;
      padding: 20px;
      border-radius: 8px;
    }
    pre {
      background: white;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
    }
  `]
})
export class DynamicFormComponent {
  selectedFieldType: string = 'text';
  fieldLabel: string = '';
  formFields: FormField[] = [];
  submittedData: any = null;
  private fieldCounter = 1;

  addField() {
    if (!this.fieldLabel.trim()) {
      alert('Veuillez entrer un label');
      return;
    }

    // PROBLÈME: if/else pour initialiser selon le type
    let field: FormField;
    
    if (this.selectedFieldType === 'text') {
      field = {
        id: 'field_' + this.fieldCounter++,
        type: 'text',
        label: this.fieldLabel,
        value: ''
      };
    } else if (this.selectedFieldType === 'email') {
      field = {
        id: 'field_' + this.fieldCounter++,
        type: 'email',
        label: this.fieldLabel,
        value: ''
      };
    } else if (this.selectedFieldType === 'number') {
      field = {
        id: 'field_' + this.fieldCounter++,
        type: 'number',
        label: this.fieldLabel,
        value: 0
      };
    } else if (this.selectedFieldType === 'textarea') {
      field = {
        id: 'field_' + this.fieldCounter++,
        type: 'textarea',
        label: this.fieldLabel,
        value: ''
      };
    } else if (this.selectedFieldType === 'checkbox') {
      field = {
        id: 'field_' + this.fieldCounter++,
        type: 'checkbox',
        label: this.fieldLabel,
        value: false
      };
    } else if (this.selectedFieldType === 'radio') {
      field = {
        id: 'field_' + this.fieldCounter++,
        type: 'radio',
        label: this.fieldLabel,
        value: '',
        options: ['Option 1', 'Option 2', 'Option 3']
      };
    } else if (this.selectedFieldType === 'select') {
      field = {
        id: 'field_' + this.fieldCounter++,
        type: 'select',
        label: this.fieldLabel,
        value: '',
        options: ['Choix 1', 'Choix 2', 'Choix 3']
      };
    } else if (this.selectedFieldType === 'date') {
      field = {
        id: 'field_' + this.fieldCounter++,
        type: 'date',
        label: this.fieldLabel,
        value: ''
      };
    } else if (this.selectedFieldType === 'file') {
      field = {
        id: 'field_' + this.fieldCounter++,
        type: 'file',
        label: this.fieldLabel,
        value: null
      };
    } else {
      // Fallback
      field = {
        id: 'field_' + this.fieldCounter++,
        type: 'text',
        label: this.fieldLabel,
        value: ''
      };
    }

    this.formFields.push(field);
    this.fieldLabel = '';
  }

  removeField(id: string) {
    this.formFields = this.formFields.filter(f => f.id !== id);
  }

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

  submitForm() {
    // PROBLÈME: Plus de if/else pour valider selon le type
    const data: any = {};
    let isValid = true;

    for (const field of this.formFields) {
      if (field.type === 'text' || field.type === 'textarea') {
        if (!field.value || field.value.trim() === '') {
          alert(`Le champ "${field.label}" est requis`);
          isValid = false;
          break;
        }
        data[field.id] = field.value.trim();
        
      } else if (field.type === 'email') {
        if (!field.value || !field.value.includes('@')) {
          alert(`Email invalide pour "${field.label}"`);
          isValid = false;
          break;
        }
        data[field.id] = field.value;
        
      } else if (field.type === 'number') {
        if (field.value === null || field.value === undefined) {
          alert(`Le champ "${field.label}" est requis`);
          isValid = false;
          break;
        }
        data[field.id] = Number(field.value);
        
      } else if (field.type === 'checkbox') {
        data[field.id] = Boolean(field.value);
        
      } else if (field.type === 'radio' || field.type === 'select') {
        if (!field.value) {
          alert(`Veuillez sélectionner une option pour "${field.label}"`);
          isValid = false;
          break;
        }
        data[field.id] = field.value;
        
      } else if (field.type === 'date') {
        if (!field.value) {
          alert(`Le champ "${field.label}" est requis`);
          isValid = false;
          break;
        }
        data[field.id] = field.value;
        
      } else if (field.type === 'file') {
        if (!field.value) {
          alert(`Veuillez sélectionner un fichier pour "${field.label}"`);
          isValid = false;
          break;
        }
        data[field.id] = field.value;
      }
    }

    if (isValid) {
      this.submittedData = data;
      console.log('Formulaire soumis:', data);
    }
  }
}
