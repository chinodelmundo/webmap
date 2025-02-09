import { DrawerModule } from 'primeng/drawer';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/layout/header';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, DrawerModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showSidebar = false;
  showJsonEditPanel = false;

  handleSidebarToggle(): void {
    this.showSidebar = !this.showSidebar;
  }

  handleEditTrigger(): void {
    this.showJsonEditPanel = !this.showJsonEditPanel;
  }
}
