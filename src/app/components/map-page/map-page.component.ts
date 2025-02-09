import { GeoJsonProperties } from 'geojson';
import { filter } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EditorService } from '@services/editor.service';

import { SAMPLE_DATA2 } from '../../data/sample_data2';
import { JsonEditorComponent } from '../json-editor';
import { MapInfoPanelComponent } from '../map-info-panel';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-map-page',
  imports: [
    MapComponent,
    MapInfoPanelComponent,
    CommonModule,
    JsonEditorComponent,
  ],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss',
})
export class MapPageComponent implements OnInit {
  #editor = inject(EditorService);

  dataToDisplay = [SAMPLE_DATA2];
  info: GeoJsonProperties = {};

  showEditPanel$ = this.#editor.displayEditPanel$;

  ngOnInit(): void {
    this.#editor.mapData$.pipe(filter((data) => !!data)).subscribe((data) => {
      this.dataToDisplay = [data];
    });
  }

  onMarkerClick($event: GeoJsonProperties) {
    this.info = $event;
  }

  onClose(): void {
    this.info = {};
  }
}
