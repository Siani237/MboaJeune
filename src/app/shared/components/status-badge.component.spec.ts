import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadgeComponent } from './status-badge.component';

describe('StatusBadgeComponent', () => {
  let component: StatusBadgeComponent;
  let fixture: ComponentFixture<StatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should render "Nouveau" and badge-new class for status new', () => {
    component.status = 'new';
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent?.trim()).toBe('Nouveau');
    expect(el.querySelector('.badge-new')).toBeTruthy();
  });

  it('should render "Retenu" and badge-selected class for status selected', () => {
    component.status = 'selected';
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent?.trim()).toBe('Retenu');
    expect(el.querySelector('.badge-selected')).toBeTruthy();
  });
});
