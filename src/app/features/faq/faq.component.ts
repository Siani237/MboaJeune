import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NEWS_REPOSITORY } from '../../domain/repositories/news.repository';
import { FaqItem } from '../../domain/models/news.model';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink, PageHeroComponent],
  template: `
    <app-page-hero eyebrow="FAQ" heading="Vos questions, nos réponses"
      lead="L'essentiel sur le programme, l'accès et la participation." />
    <div class="container body">
      <div class="list">
        @for (f of faq(); track f.id; let i = $index) {
          <details class="q" [open]="i === 0">
            <summary>
              <span class="n">{{ (i + 1).toString().padStart(2, '0') }}</span>
              <span class="t">{{ f.question }}</span>
              <span class="x" aria-hidden="true"></span>
            </summary>
            <p>{{ f.answer }}</p>
          </details>
        }
      </div>
      <aside class="more">
        <h2>Une autre question ?</h2>
        <p>L'équipe se tient à votre disposition.</p>
        <a routerLink="/contact" class="btn btn-primary">Nous contacter</a>
      </aside>
    </div>
  `,
  styles: [`
    .body { padding-block: 3rem 1rem; max-width: 52rem; }
    .list { border-top: 2px solid var(--ink); }
    .q { border-bottom: 1px solid var(--color-border-dark); }
    summary { display: flex; align-items: center; gap: 1.2rem; padding: 1.25rem .25rem; cursor: pointer; list-style: none; }
    summary::-webkit-details-marker { display: none; }
    .n { font-family: var(--font-display); font-weight: 800; color: var(--orange); font-size: 1.1rem; min-width: 2rem; }
    .t { flex: 1; font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; }
    .x { width: 18px; height: 18px; position: relative; flex-shrink: 0; }
    .x::before, .x::after { content: ''; position: absolute; background: var(--ink); border-radius: 2px; }
    .x::before { left: 0; right: 0; top: 8px; height: 2px; }
    .x::after { top: 0; bottom: 0; left: 8px; width: 2px; transition: transform .2s; }
    details[open] .x::after { transform: scaleY(0); }
    .q p { padding: 0 .25rem 1.5rem 3.2rem; margin: 0; color: var(--text-muted); font-size: 1.02rem; }
    .more { margin-top: 3rem; background: var(--ink); color: var(--text-on-dark); border-radius: var(--radius-leaf); padding: 2.2rem; }
    .more h2 { color: var(--ochre); font-size: 1.6rem; }
    .more p { color: var(--text-on-dark-muted); }
  `]
})
export class FaqComponent implements OnInit {
  private readonly repo = inject(NEWS_REPOSITORY);
  readonly faq = signal<FaqItem[]>([]);
  async ngOnInit(): Promise<void> { this.faq.set(await this.repo.getFaq()); }
}
