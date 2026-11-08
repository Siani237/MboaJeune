import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NEWS_REPOSITORY } from '../../domain/repositories/news.repository';
import { NewsArticle } from '../../domain/models/news.model';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container page-content">
      <header class="page-header">
        <span class="section-tag">Publications & Événements</span>
        <h1>Actualités du programme</h1>
        <p class="lead">
          Suivez les étapes de déploiement du projet Mboa Jeunes Créatifs, les annonces officielles et la vie de la communauté.
        </p>
      </header>

      <div class="news-list">
        <article *ngFor="let article of articles()" class="news-card card">
          <div class="news-meta">
            <span class="news-category">{{ article.category }}</span>
            <span class="news-date">Publié le {{ article.publishedAt }}</span>
            <span class="news-demo-tag" *ngIf="article.isMockData">Contenu démo</span>
          </div>

          <h2 class="news-title">{{ article.title }}</h2>
          <p class="news-summary">{{ article.summary }}</p>
          <div class="news-body">
            <p *ngFor="let paragraph of article.content.split('\n\n')">{{ paragraph }}</p>
          </div>
          
          <div class="news-footer">
            <span class="news-author">Par {{ article.author }}</span>
          </div>
        </article>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 3rem 1.5rem 4rem;
      max-width: 860px;
    }
    .page-header {
      margin-bottom: 2.5rem;
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 2rem;
    }
    .section-tag {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .lead {
      font-size: 1.15rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-top: 0.75rem;
    }
    .news-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .news-card {
      padding: 2.25rem;
    }
    .news-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.825rem;
      margin-bottom: 0.75rem;
    }
    .news-category {
      font-weight: 700;
      color: var(--color-primary);
      text-transform: uppercase;
    }
    .news-date {
      color: var(--color-text-light);
    }
    .news-demo-tag {
      background-color: var(--color-surface-subtle);
      border: 1px solid var(--color-border);
      padding: 0.15rem 0.4rem;
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }
    .news-title {
      font-size: 1.6rem;
      margin-bottom: 0.75rem;
    }
    .news-summary {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--color-text-main);
      margin-bottom: 1.25rem;
      line-height: 1.5;
    }
    .news-body {
      color: var(--color-text-muted);
      line-height: 1.7;
      margin-bottom: 1.5rem;
      white-space: pre-line;
    }
    .news-footer {
      border-top: 1px solid var(--color-border);
      padding-top: 1rem;
      font-size: 0.85rem;
      color: var(--color-text-light);
      font-style: italic;
    }
  `]
})
export class NewsComponent implements OnInit {
  private readonly newsRepo = inject(NEWS_REPOSITORY);
  readonly articles = signal<NewsArticle[]>([]);

  async ngOnInit(): Promise<void> {
    const list = await this.newsRepo.getArticles();
    this.articles.set(list);
  }
}
