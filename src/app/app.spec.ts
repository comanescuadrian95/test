import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render assignment title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Test');
  });

  it('should disable and enable status/display controls from checkbox handler', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.onStatusDisabledChange({ target: { checked: true } } as unknown as Event);
    expect(app.form.controls.statusOpen.disabled).toBeTrue();
    expect(app.form.controls.display.disabled).toBeTrue();
    expect(app.form.controls.statusOpen.value).toBeFalse();

    app.onStatusDisabledChange({ target: { checked: false } } as unknown as Event);
    expect(app.form.controls.statusOpen.enabled).toBeTrue();
    expect(app.form.controls.display.enabled).toBeTrue();
  });

  it('should set status to closed when details are closed', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.form.controls.statusOpen.setValue(true);
    app.onDetailsClose();

    expect(app.form.controls.statusOpen.value).toBeFalse();
    expect(app.statusLabel()).toBe('closed');
  });
});
