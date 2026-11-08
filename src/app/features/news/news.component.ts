import { Component, OnInit, inject, signal } from '@angular/core';
import { NEWS_REPOSITORY } from '../../domain/repositories/news.repository';
import { NewsArticle } from '../../domain/models/news.model';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [PageHeroComponent],
  template: `
    <app-page-hero eyebrow="Actualités" heading="La vie du programme"
      lead="Annonces, étapes du déploiement et vie de la communauté." />

    <div class="container body">
      <p class="mock-note">Articles de <strong>démonstration</strong> : ils ne constituent pas des publications officielles.</p>
      <div class="list">
        @for (a of articles(); track a.id; let i = $index) {
          <article class="post" [class.alt]="i % 2 === 1">
            <div class="side">
              <span class="cat">{{ a.category }}</span>
              <time>{{ a.publishedAt }}</time>
              @if (a.isMockData) { <span class="demo">Contenu démo</span> }
            </div>
            <div class="main">
              <h2>{{ a.title }}</h2>
              <p class="summary">{{ a.summary }}</p>
              @for (p of a.content.split('\n\n'); track $index) { <p>{{ p }}</p> }
              <p class="author">Par {{ a.author }}</p>
            </div>
          </article>
        }
      </div>
    </div>
  `,
  styles: [`
    .body { padding-block: 2.5rem 1rem; max-width: 62rem; }
    .mock-note { font-size: .85rem; color: var(--text-muted); margin-bottom: 2rem; }
    .list { display: flex; flex-direction: column; gap: 3rem; }
    .post { display: grid; grid-template-columns: 180px 1fr; gap: 2rem; border-top: 4px solid var(--orange); padding-top: 1.5rem; }
    .post.alt { border-color: var(--cyan); }
    .side { display: flex; flex-direction: column; gap: .5rem; align-items: flex-start; }
    .cat { font-size: .75rem; letter-spacing: .14em; text-transform: uppercase; font-weight: 800; color: var(--orange-deep); }
    time { font-size: .88rem; color: var(--text-muted); }
    .demo { background: var(--ochre); border-radius: 999px; padding: .1rem .6rem; font-size: .7rem; font-weight: 700; }
    .main h2 { font-size: 2rem; }
    .summary { font-family: var(--font-display); font-size: 1.2rem; color: var(--text); }
    .main p { color: var(--text-muted); white-space: pre-line; }
    .author { font-size: .85rem; font-style: italic; border-top: 1px solid var(--line); padding-top: .8rem; }
    @media (max-width: 700px) { .post { grid-template-columns: 1fr; gap: .8rem; } .side { flex-direction: row; flex-wrap: wrap; align-items: center; } }
  `]
})
export class NewsComponent implements OnInit {
  private readonly repo = inject(NEWS_REPOSITORY);
  readonly articles = signal<NewsArticle[]>([]);
  async ngOnInit(): Promise<void> { this.articles.set(await this.repo.getArticles()); }
}
