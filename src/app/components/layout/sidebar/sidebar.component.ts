import { ButtonModule } from 'primeng/button';
import { BehaviorSubject, take } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '@services/search.service';

import { SearchResultComponent } from '../../search-result';

@Component({
  selector: 'app-sidebar',
  imports: [ButtonModule, FormsModule, CommonModule, SearchResultComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  #searchService = inject(SearchService);
  #results = new BehaviorSubject<GeoJSON.Feature[]>([]);

  searchValue: string = '';
  results$ = this.#results.asObservable();

  search(): void {
    this.#searchService
      .search(this.searchValue)
      .pipe(take(1))
      .subscribe(({ features }) => {
        console.log(features);
        this.#results.next(features);
      });
  }
}
