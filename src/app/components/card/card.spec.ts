import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render details only when open input is true', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.active-card-details')).toBeNull();

    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    expect(element.querySelector('.active-card-details')).not.toBeNull();
  });

  it('should emit closed event when closeDetails is called', () => {
    let emitted = false;
    component.closed.subscribe(() => {
      emitted = true;
    });

    component.closeDetails();

    expect(emitted).toBeTrue();
  });
});
