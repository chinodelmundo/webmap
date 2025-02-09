import { CardModule } from 'primeng/card';

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  imports: [CardModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent {
  item = input<GeoJSON.Feature<GeoJSON.Point>>();
}
