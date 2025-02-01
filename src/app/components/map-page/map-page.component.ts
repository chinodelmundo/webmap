import { Component } from '@angular/core';

import { SAMPLE_DATA1 } from '../../data/sample_data1';
import { MapInfoPanelComponent } from '../map-info-panel';
import { MapComponent } from '../map/map.component';
import { GeoJsonProperties } from 'geojson';

@Component({
  selector: 'app-map-page',
  imports: [MapComponent, MapInfoPanelComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss',
})
export class MapPageComponent {
  dataToDisplay = [SAMPLE_DATA1];
  info: GeoJsonProperties = {};

  onMarkerClick($event: GeoJsonProperties) {
    this.info = $event;
  }

  onClose(): void {
    this.info = {};
  }
}
