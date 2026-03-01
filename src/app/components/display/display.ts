import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DisplayValue } from './display.types';

@Component({
  selector: 'app-display',
  templateUrl: './display.html',
  styleUrls: ['./display.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Display),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Display implements ControlValueAccessor {
  private readonly titleState = signal('');
  private readonly contentState = signal('');
  private readonly disabledState = signal(false);
  private onChange: (value: DisplayValue) => void = () => {};
  private onTouched: () => void = () => {};

  readonly title = this.titleState.asReadonly();
  readonly content = this.contentState.asReadonly();
  readonly isDisabled = this.disabledState.asReadonly();

  writeValue(value: DisplayValue | null): void {
    this.applyValue({
      title: value?.title ?? '',
      content: value?.content ?? '',
    });
  }

  registerOnChange(fn: (value: DisplayValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  onTitleInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.titleState.set(next);
    this.onChange({
      title: next,
      content: this.content(),
    });
  }

  onContentInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.contentState.set(next);
    this.onChange({
      title: this.title(),
      content: next,
    });
  }

  markAsTouched(): void {
    this.onTouched();
  }

  private applyValue(value: DisplayValue): void {
    this.titleState.set(value.title);
    this.contentState.set(value.content);
  }
}
