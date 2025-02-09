import { GeoJsonProperties } from 'geojson';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject, filter } from 'rxjs';

import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { LocationService } from '@services/location.service';

@Component({
  selector: 'app-map-info-panel',
  imports: [MatMenuModule, ButtonModule],
  templateUrl: './map-info-panel.component.html',
  styleUrl: './map-info-panel.component.scss',
})
export class MapInfoPanelComponent implements OnInit {
  #locationService = inject(LocationService);

  location$ = this.#locationService.location$.pipe(
    filter((location) => !!location)
  );
  coordinates = new BehaviorSubject<number[] | undefined>(undefined);

  close = output();
  info = input<GeoJsonProperties>({});
  truthyInfo = computed(() => this.info() ?? {});
  infoProps = computed(() => Object.keys(this.info() as object));
  display = true;

  ngOnInit(): void {
    this.location$.subscribe((coordinates) => {
      this.coordinates.next(coordinates);
    });
  }

  onClose(): void {
    this.close.emit();
  }

  getStreetViewUrl(): string {
    const coords = this.coordinates.getValue();
    if (coords) {
      return `http://maps.google.com/maps?q=&layer=c&cbll=${coords[0]},${coords[1]}`;
    } else {
      return '';
    }
  }

  getMapsUrl(): string {
    const coords = this.coordinates.getValue();
    if (coords) {
      return `http://maps.google.com/?q=${coords[0]},${coords[1]}`;
    } else {
      return '';
    }
  }

  getOpenstreetsUrl(): string {
    const coords = this.coordinates.getValue();
    if (coords) {
      return `https://www.openstreetmap.org/?mlat=${coords[0]}&mlon=${coords[1]}`;
    } else {
      return '';
    }
  }
}
