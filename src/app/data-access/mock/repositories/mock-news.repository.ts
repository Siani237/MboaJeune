import { Injectable } from '@angular/core';
import { NewsRepository } from '../../../domain/repositories/news.repository';
import { NewsArticle, FaqItem } from '../../../domain/models/news.model';
import { INITIAL_NEWS, INITIAL_FAQ } from '../seed/mock-data.seed';

@Injectable({
  providedIn: 'root'
})
export class MockNewsRepository implements NewsRepository {
  private readonly delayMs = 60;

  private simulate<T>(val: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(val), this.delayMs));
  }

  getArticles(): Promise<NewsArticle[]> {
    return this.simulate([...INITIAL_NEWS]);
  }

  getArticleBySlug(slug: string): Promise<NewsArticle | null> {
    const found = INITIAL_NEWS.find((n) => n.slug === slug) || null;
    return this.simulate(found);
  }

  getFaq(): Promise<FaqItem[]> {
    return this.simulate([...INITIAL_FAQ]);
  }
}
