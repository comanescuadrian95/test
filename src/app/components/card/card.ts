import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-card',
    templateUrl: './card.html',
    styleUrls: ['./card.scss'],
    standalone: true,
    imports: [MatCard, MatIcon, MatIconButton],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly open = input(false);
  readonly closed = output<void>();

  closeDetails(): void {
    this.closed.emit();
  }
}
