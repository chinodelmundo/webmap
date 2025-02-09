import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private displayEditPanel = new BehaviorSubject<boolean>(false);
  private mapData = new BehaviorSubject<any>(undefined);

  readonly displayEditPanel$ = this.displayEditPanel.asObservable();
  readonly mapData$ = this.mapData.asObservable();

  toggleDisplay(): void {
    this.displayEditPanel.next(!this.displayEditPanel.getValue());
  }

  setMapData(value: any): void {
    this.mapData.next(value);
  }
}
