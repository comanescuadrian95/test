import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Color, COLOR_TOKENS, ColorToken } from './status-card.types';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.html',
  styleUrls: ['./status-card.scss'],
  standalone: true,
  imports: [MatCard, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusCard),
      multi: true,
    },
  ],
  host: {
    '[style.--status-card-surface-current]': 'colorToken().surface',
    '[style.--status-card-text-current]': 'colorToken().text',
    '[style.--status-card-shadow-current]': 'shadowToken()',
    '[style.--status-card-border-current]': 'borderToken()',
  },
})
export class StatusCard implements ControlValueAccessor {
  private static readonly DISABLED_TOKENS: ColorToken = {
    surface: 'var(--status-card-disabled-surface)',
    text: 'var(--status-card-disabled-text)',
  };

  private readonly activeState = signal(false);
  private readonly disabledState = signal(false);
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  readonly title = input.required<string>();
  readonly content = input.required<string>();
  readonly color = input<Color>('primary');

  readonly colorToken = computed(() =>
    this.isDisabled()
      ? StatusCard.DISABLED_TOKENS
      : COLOR_TOKENS[this.color()]
  );
  readonly isActive = this.activeState.asReadonly();
  readonly isDisabled = this.disabledState.asReadonly();
  readonly shadowToken = computed(() =>
    this.isDisabled() ? 'none' : 'var(--status-card-shadow)'
  );

  readonly borderToken = computed(() =>
    this.isDisabled()
      ? 'transparent'
      : this.isActive()
        ? 'var(--status-card-active-border-color)'
        : 'transparent'
  );

  writeValue(value: boolean | null): void {
    this.activeState.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  toggleActive(): void {
    if (this.isDisabled()) {
      return;
    }

    const next = !this.isActive();
    this.activeState.set(next);
    this.onChange(next);
    this.markAsTouched();
  }

  onCardKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleActive();
    }
  }

  markAsTouched(): void {
    this.onTouched();
  }
}
