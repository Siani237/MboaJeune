import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { TALENT_REPOSITORY } from './domain/repositories/talent.repository';
import { MockTalentRepository } from './data-access/mock/repositories/mock-talent.repository';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: TALENT_REPOSITORY, useClass: MockTalentRepository }
      ]
    }).compileComponents();
  });

  it('should create the app shell with layout components', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the main header, router-outlet container and footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('main#main-content')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });
});
