import { InjectionToken } from '@angular/core';
import { NewsArticle, FaqItem } from '../models/news.model';

export interface NewsRepository {
  getArticles(): Promise<NewsArticle[]>;
  getArticleBySlug(slug: string): Promise<NewsArticle | null>;
  getFaq(): Promise<FaqItem[]>;
}

export const NEWS_REPOSITORY = new InjectionToken<NewsRepository>('NEWS_REPOSITORY');
