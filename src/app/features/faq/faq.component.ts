import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NEWS_REPOSITORY } from '../../domain/repositories/news.repository';
import { FaqItem } from '../../domain/models/news.model';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container page-content">
      <header class="page-header">
        <span class="section-tag">Aide & Informations</span>
        <h1>Foire Aux Questions (FAQ)</h1>
        <p class="lead">
          Retrouvez les réponses aux questions les plus courantes sur le fonctionnement de Mboa Jeunes Créatifs, 
          les conditions d'accès et les modalités de participation.
        </p>
      </header>

      <div class="faq-list">
        <details *ngFor="let item of faq()" class="faq-item card" open>
          <summary class="faq-question">
            <span>{{ item.question }}</span>
          </summary>
          <div class="faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </details>
      </div>

      <div class="contact-box card">
        <h3>Vous avez une autre question ?</h3>
        <p>L'équipe du programme se tient à votre disposition pour vous orienter et vous conseiller.</p>
        <a routerLink="/contact" class="btn btn-primary">Nous contacter →</a>
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
    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .faq-item {
      padding: 1.5rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background-color: var(--color-surface);
    }
    .faq-question {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-main);
      cursor: pointer;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .faq-question::-webkit-details-marker {
      display: none;
    }
    .faq-answer {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--color-surface-subtle);
      color: var(--color-text-muted);
      font-size: 0.975rem;
      line-height: 1.6;
    }
    .faq-answer p {
      margin: 0;
    }
    .contact-box {
      margin-top: 3rem;
      text-align: center;
      background-color: var(--color-surface-subtle);
      padding: 2.5rem;
    }
    .contact-box h3 {
      margin-bottom: 0.5rem;
    }
    .contact-box p {
      color: var(--color-text-muted);
      margin-bottom: 1.5rem;
    }
  `]
})
export class FaqComponent implements OnInit {
  private readonly newsRepo = inject(NEWS_REPOSITORY);
  readonly faq = signal<FaqItem[]>([]);

  async ngOnInit(): Promise<void> {
    const list = await this.newsRepo.getFaq();
    this.faq.set(list);
  }
}
