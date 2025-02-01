import { GeoJsonProperties } from 'geojson';
import { ButtonModule } from 'primeng/button';

import { Component, computed, input, output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-map-info-panel',
  imports: [MatMenuModule, ButtonModule],
  templateUrl: './map-info-panel.component.html',
  styleUrl: './map-info-panel.component.scss',
})
export class MapInfoPanelComponent {
  close = output();
  info = input<GeoJsonProperties>({});
  truthyInfo = computed(() => this.info() ?? {});
  infoProps = computed(() => Object.keys(this.info() as object));
  display = true;

  onClose(): void {
    this.close.emit();
  }

  getStreetViewUrl(): string {
    return `http://maps.google.com/maps?q=&layer=c&cbll=${
      this.info()?.['latitude']
    },${this.info()?.['[longitude]']}`;
  }

  getMapsUrl(): string {
    return `http://maps.google.com/?q=${this.info()?.['latitude']},${
      this.info()?.['longitude']
    }`;
  }

  getOpenstreetsUrl(): string {
    return `https://www.openstreetmap.org/?mlat=${
      this.info()?.['latitude']
    }&mlon=${this.info()?.['longitude']}`;
  }

  onStreetView(): void {
    const url = `http://maps.google.com/maps?q=&layer=c&cbll=${
      this.info()?.['latitude']
    },${this.info()?.['longitude']}`;
    window.open(url, '_blank');
  }
}
