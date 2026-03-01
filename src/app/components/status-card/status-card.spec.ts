import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCard } from './status-card';

describe('StatusCard', () => {
  let component: StatusCard;
  let fixture: ComponentFixture<StatusCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusCard],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusCard);
    fixture.componentRef.setInput('title', 'Title 2.2');
    fixture.componentRef.setInput('content', 'Content');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and content inputs', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')?.textContent?.trim()).toBe('Title 2.2');
    expect(element.querySelector('.status-card-content p')?.textContent?.trim()).toBe(
      'Content'
    );
  });

  it('should toggle active state and call CVA callbacks', () => {
    let changed: boolean | null = null;
    let touched = false;

    component.registerOnChange((value) => {
      changed = value;
    });
    component.registerOnTouched(() => {
      touched = true;
    });

    component.toggleActive();
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector(
      '.status-card'
    ) as HTMLElement;
    expect(component.isActive()).toBeTrue();
    expect(changed).toBeTrue();
    expect(touched).toBeTrue();
    expect(cardElement.getAttribute('aria-pressed')).toBe('true');
  });

  it('should not toggle when disabled', () => {
    component.setDisabledState(true);
    component.writeValue(false);
    fixture.detectChanges();

    component.toggleActive();
    fixture.detectChanges();

    expect(component.isActive()).toBeFalse();
    expect(component.isDisabled()).toBeTrue();
  });
});
