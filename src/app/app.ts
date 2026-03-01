import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { Card } from './components/card/card';
import { Display } from './components/display/display';
import { DisplayValue } from './components/display/display.types';
import { StatusCard } from './components/status-card/status-card';
import { Color } from './components/status-card/status-card.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [Card, Display, StatusCard, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly statusColorOptions: ReadonlyArray<{
    value: Color;
    label: string;
  }> = [
    { value: 'primary', label: 'Primary' },
    { value: 'success', label: 'Success' },
    { value: 'warning', label: 'Warning' },
    { value: 'danger', label: 'Danger' },
    { value: 'attention', label: 'Attention' },
  ];

  readonly form = new FormGroup({
    display: new FormControl<DisplayValue>(
      {
        title: 'Title 2.2',
        content: 'Content',
      },
      { nonNullable: true }
    ),
    statusOpen: new FormControl(false, { nonNullable: true }),
    statusColor: new FormControl<Color>('primary', { nonNullable: true }),
  });

  readonly displayValue = toSignal(
    this.form.controls.display.valueChanges.pipe(
      startWith(this.form.controls.display.value)
    ),
    {
      initialValue: this.form.controls.display.value,
    }
  );

  readonly statusOpen = toSignal(
    this.form.controls.statusOpen.valueChanges.pipe(
      startWith(this.form.controls.statusOpen.value)
    ),
    {
      initialValue: this.form.controls.statusOpen.value,
    }
  );

  readonly statusLabel = computed(() => (this.statusOpen() ? 'open' : 'closed'));

  readonly statusColor = toSignal(
    this.form.controls.statusColor.valueChanges.pipe(
      startWith(this.form.controls.statusColor.value)
    ),
    {
      initialValue: this.form.controls.statusColor.value,
    }
  );

  onStatusDisabledChange(event: Event): void {
    const next = (event.target as HTMLInputElement).checked;
    const statusControl = this.form.controls.statusOpen;
    const displayControl = this.form.controls.display;

    if (next) {
      statusControl.setValue(false);
      statusControl.disable();
      displayControl.disable();
      return;
    }

    statusControl.enable();
    displayControl.enable();
  }

  onDetailsClose(): void {
    this.form.controls.statusOpen.setValue(false);
  }
}
