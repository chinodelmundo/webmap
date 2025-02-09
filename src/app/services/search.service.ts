import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  #http = inject(HttpClient);
  #baseUrl: string = 'https://nominatim.openstreetmap.org/search';

  search(query: string): Observable<GeoJSON.FeatureCollection<GeoJSON.Point>> {
    const url = `${this.#baseUrl}?q=${encodeURIComponent(query)}&format=json`;
    return this.#http.get<any[]>(url).pipe(map(this.#formatResults));
  }

  #formatResults(results: any[]): GeoJSON.FeatureCollection<GeoJSON.Point> {
    let features: GeoJSON.Feature<GeoJSON.Point>[] = [];
    results.forEach((result) => {
      features.push({
        type: 'Feature',
        properties: result,
        geometry: {
          type: 'Point',
          coordinates: [Number(result?.['lat']), Number(result?.['lon'])],
        },
      });
    });

    return {
      type: 'FeatureCollection',
      features,
    };
  }
}
