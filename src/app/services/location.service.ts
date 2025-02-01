import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  readonly location$ = new BehaviorSubject<number[] | undefined>(undefined);

  setLocation(coordinates: number[]): void {
    this.location$.next(coordinates);
  }
}
