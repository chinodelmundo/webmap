import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { EditorService } from '@services/editor.service';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, DrawerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  #route = inject(Router);
  #editor = inject(EditorService);

  onSidebarToggle = output<void>();

  onTitleClick(): void {
    this.#route.navigate(['/']);
  }

  onToggleClick(): void {
    this.onSidebarToggle.emit();
  }

  onEditClick(): void {
    this.#editor.toggleDisplay();
  }
}
