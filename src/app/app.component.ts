import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DemoBannerComponent } from './core/layout/demo-banner.component';
import { HeaderComponent } from './core/layout/header.component';
import { FooterComponent } from './core/layout/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DemoBannerComponent, HeaderComponent, FooterComponent],
  template: `
    <app-demo-banner />
    <app-header />
    <main id="main-content" class="main-content">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 350px);
    }
  `]
})
export class AppComponent {}
