import { GeoJsonProperties } from 'geojson';

import { Component } from '@angular/core';

import { SAMPLE_DATA1 } from '../../data/sample_data1';
import { SAMPLE_DATA2 } from '../../data/sample_data2';
import { MapInfoPanelComponent } from '../map-info-panel';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-map-page',
  imports: [MapComponent, MapInfoPanelComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss',
})
export class MapPageComponent {
  dataToDisplay = [SAMPLE_DATA2];
  info: GeoJsonProperties = {};

  onMarkerClick($event: GeoJsonProperties) {
    this.info = $event;
  }

  onClose(): void {
    this.info = {};
  }
}
