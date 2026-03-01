import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Display } from './display';

describe('Display', () => {
  let component: Display;
  let fixture: ComponentFixture<Display>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Display],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Display);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write form value to inputs', () => {
    component.writeValue({ title: 'New title', content: 'New content' });
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input');
    
    expect(inputs[0].value).toBe('New title');
    expect(inputs[1].value).toBe('New content');
  });
});
