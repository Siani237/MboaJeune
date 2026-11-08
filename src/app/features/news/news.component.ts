import { Component, OnInit, inject, signal } from '@angular/core';
import { NEWS_REPOSITORY } from '../../domain/repositories/news.repository';
import { NewsArticle } from '../../domain/models/news.model';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [PageHeroComponent],
  template: `
    <app-page-hero
      eyebrow="Actualités officielles"
      heading="La vie du programme"
      lead="Suivez les étapes clés du déploiement, les lancements d'ateliers et les annonces de l'Institut français du Cameroun."
    />

    <div class="container body">
      <div class="list">
        @for (a of articles(); track a.id; let i = $index) {
          <article class="post" [class.alt]="i % 2 === 1">
            @if (a.image) {
              <div class="post-media">
                <img [src]="a.image" [alt]="a.title" loading="lazy">
              </div>
            }
            <div class="post-main">
              <div class="side-meta">
                <span class="cat">{{ a.category }}</span>
                <time>{{ a.publishedAt }}</time>
              </div>
              <h2>{{ a.title }}</h2>
              <p class="summary">{{ a.summary }}</p>
              @for (p of a.content.split('\n\n'); track $index) {
                <p class="paragraph">{{ p }}</p>
              }
              <p class="author">Par {{ a.author }}</p>
            </div>
          </article>
        }
      </div>
    </div>
  `,
  styles: [`
    .body { padding-block: 4rem 2rem; max-width: 64rem; }
    .list { display: flex; flex-direction: column; gap: 3.5rem; }
    .post {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 2.5rem;
      border-top: 4px solid var(--orange);
      padding-top: 2rem;
      align-items: start;
    }
    .post.alt { border-color: var(--cyan); }
    .post-media {
      height: 220px;
      border-radius: var(--radius-leaf);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }
    .post-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .5s ease;
    }
    .post:hover .post-media img {
      transform: scale(1.05);
    }
    .side-meta {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: .6rem;
    }
    .cat {
      font-size: .78rem;
      letter-spacing: .14em;
      text-transform: uppercase;
      font-weight: 800;
      color: var(--orange-deep);
    }
    time { font-size: .88rem; color: var(--text-muted); }
    .post-main h2 { font-size: 2rem; margin-bottom: .75rem; }
    .summary {
      font-family: var(--font-display);
      font-size: 1.25rem;
      color: var(--text);
      line-height: 1.5;
      margin-bottom: 1rem;
    }
    .paragraph { color: var(--text-muted); line-height: 1.7; font-size: 1.02rem; }
    .author {
      font-size: .88rem;
      font-style: italic;
      color: var(--color-text-light);
      border-top: 1px solid var(--line);
      padding-top: .85rem;
      margin-top: 1.5rem;
    }
    @media (max-width: 800px) {
      .post { grid-template-columns: 1fr; gap: 1.25rem; }
      .post-media { height: 200px; }
    }
  `]
})
export class NewsComponent implements OnInit {
  private readonly repo = inject(NEWS_REPOSITORY);
  readonly articles = signal<NewsArticle[]>([]);
  async ngOnInit(): Promise<void> {
    this.articles.set(await this.repo.getArticles());
  }
}
