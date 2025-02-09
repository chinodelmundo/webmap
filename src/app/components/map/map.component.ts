import { Feature, GeoJsonProperties, Geometry, Point } from 'geojson';
import * as L from 'leaflet';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import {
  Component,
  inject,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { LocationService } from '@services/location.service';

import { MAP_TILES } from './map.tiles';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnChanges, OnDestroy {
  #locationService = inject(LocationService);

  markerClick = output<GeoJsonProperties>();
  dataToDisplay = input<any[]>([]);
  displayDialog: boolean = false;

  private map: any;
  private centroid: L.LatLngExpression = [
    14.650488834513162, 121.0492835343067,
  ];
  private dataLayerGroup = L.layerGroup();
  selectedLatLong?: L.LatLng;

  ngOnChanges(changes: SimpleChanges): void {
    this.initMap();
  }

  private initMap(): void {
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map', {
      layers: [MAP_TILES.osm],
    }).setView(this.centroid, 11);

    const baseMaps = {
      OpenStreetMap: MAP_TILES.osm,
      'OpenStreetMap.HOT': MAP_TILES.osmHOT,
      OpenTopoMap: MAP_TILES.openTopoMap,
      EsriWorldImagery: MAP_TILES.esriWorldImagery,
    };

    L.control.layers(baseMaps).addTo(this.map);

    this.map.addLayer(this.dataLayerGroup);
    this.addMapData();

    this.map.on('dblclick', (event: any) => {
      this.selectedLatLong = event.latlng as L.LatLng;
      this.#showDialog();
    });
  }

  private addMapData(): void {
    this.dataLayerGroup.clearLayers();

    this.dataToDisplay().forEach((data: GeoJSON.FeatureCollection) => {
      L.geoJSON(<GeoJSON.FeatureCollection>data, {
        onEachFeature: this.onEachFeature,
      }).addTo(this.dataLayerGroup);

      const points = data.features.filter(
        (feature: any) => feature.geometry.type === 'Point'
      );

      if (points.length > 0) {
        const coordinates = (points[0].geometry as Point).coordinates;
        this.map.setView([coordinates[1], coordinates[0]]);
      }
    });
  }

  private onEachFeature = (
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer
  ) => {
    layer.on('click', () => {
      if (feature.geometry.type === 'Point') {
        const { coordinates } = feature.geometry as Point;
        this.#locationService.setLocation([coordinates[1], coordinates[0]]);
      }
      this.markerClick.emit(feature.properties);
    });
  };

  onDialogSubmit(): void {
    this.displayDialog = false;
  }

  #showDialog() {
    this.displayDialog = true;
  }

  ngOnDestroy(): void {
    this.map.remove();
  }
}
