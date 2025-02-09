import { ButtonModule } from 'primeng/button';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorService } from '@services/editor.service';

import { SAMPLE_DATA2 } from '../../data/sample_data2';

@Component({
  selector: 'app-json-editor',
  imports: [FormsModule, ButtonModule],
  templateUrl: './json-editor.component.html',
  styleUrl: './json-editor.component.scss',
})
export class JsonEditorComponent {
  #editor = inject(EditorService);

  jsonInput: string = JSON.stringify(SAMPLE_DATA2, null, 2);
  parsedJson: any = null;
  errorMessage: string = '';

  parseJson() {
    try {
      this.parsedJson = JSON.parse(this.jsonInput);
      this.errorMessage = '';
      this.#editor.setMapData(this.parsedJson);
      this.jsonInput = JSON.stringify(this.parsedJson, null, 2);
    } catch (e) {
      this.parsedJson = null;
      this.errorMessage = 'Invalid GeoJSON format.';
    }
  }
}
