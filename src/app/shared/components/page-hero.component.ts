import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  template: `
    <section class="page-hero">
      <span class="blob b1" aria-hidden="true"></span>
      <span class="blob b2" aria-hidden="true"></span>
      <span class="blob b3" aria-hidden="true"></span>
      <div class="container wrap">
        <span class="eyebrow on-dark">{{ eyebrow }}</span>
        <h1>{{ heading }}</h1>
        @if (lead) { <p class="lead">{{ lead }}</p> }
        <ng-content />
      </div>
    </section>
  `,
  styles: [`
    .page-hero { padding: 4rem 0 4.25rem; }
    .wrap { position: relative; z-index: 1; }
    .wrap h1, .wrap .lead { max-width: 44rem; }
    .lead { font-size: 1.15rem; max-width: 46rem; margin-bottom: 0; }
    .blob { position: absolute; border-radius: 999px; transform: rotate(-35deg); }
    .b1 { width: 110px; height: 340px; right: -2%; top: -60px; background: var(--red); opacity: .9; }
    .b2 { width: 80px; height: 280px; right: 6%; top: -20px; background: var(--orange); opacity: .9; }
    .b3 { width: 60px; height: 220px; right: 12%; top: 30px; background: var(--cyan); opacity: .9; }
    @media (max-width: 1100px) { .blob { opacity: .3 !important; } }
  `]
})
export class PageHeroComponent {
  @Input({ required: true }) eyebrow = '';
  @Input({ required: true }) heading = '';
  @Input() lead = '';
}
