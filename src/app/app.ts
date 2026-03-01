import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Card } from './components/card/card';
import { Display } from './components/display/display';
import { StatusCard } from './components/status-card/status-card';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [Card, Display, StatusCard, MatFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
}
