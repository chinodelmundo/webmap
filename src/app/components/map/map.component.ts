import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import * as L from 'leaflet';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { Component, input, OnDestroy, OnInit, output } from '@angular/core';

import { MAP_TILES } from './map.tiles';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnDestroy {
  markerClick = output<GeoJsonProperties>();
  dataToDisplay = input<any[]>([]);
  displayDialog: boolean = false;

  private map: any;
  private centroid: L.LatLngExpression = [
    14.650488834513162, 121.0492835343067,
  ];
  private dataLayerGroup = L.layerGroup();
  selectedLatLong?: L.LatLng;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      layers: [MAP_TILES.osm],
    }).setView(this.centroid, 9);

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

  private addMapData(setView = false): void {
    this.dataLayerGroup.clearLayers();

    const featureCollection: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: this.dataToDisplay(),
    };

    L.geoJSON(<GeoJSON.FeatureCollection>featureCollection, {
      onEachFeature: this.onEachFeature,
    }).addTo(this.dataLayerGroup);

    if (setView && featureCollection.features.length > 0) {
      const datumProperties = featureCollection.features[0].properties;
      this.map.setView([
        datumProperties?.['LATITUDE'],
        datumProperties?.['LONGITUDE'],
      ]);
    }
  }

  private onEachFeature = (
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer
  ) => {
    layer.on('click', () => {
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
