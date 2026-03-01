import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.html',
  styleUrls: ['./status-card.scss'],
  standalone: true,
  imports: [MatCard, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusCard {
  readonly title = input('Title 2.2');
  readonly content = input('Content');
  readonly value = input(0);
}
