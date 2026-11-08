import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { TALENT_REPOSITORY } from './domain/repositories/talent.repository';
import { MockTalentRepository } from './data-access/mock/repositories/mock-talent.repository';
import { ACTIVITY_REPOSITORY } from './domain/repositories/activity.repository';
import { MockActivityRepository } from './data-access/mock/repositories/mock-activity.repository';
import { NEWS_REPOSITORY } from './domain/repositories/news.repository';
import { MockNewsRepository } from './data-access/mock/repositories/mock-news.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    { provide: TALENT_REPOSITORY, useClass: MockTalentRepository },
    { provide: ACTIVITY_REPOSITORY, useClass: MockActivityRepository },
    { provide: NEWS_REPOSITORY, useClass: MockNewsRepository }
  ]
};
