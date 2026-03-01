import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Card } from './components/card/card';
import { Display } from './components/display/display';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [Card, Display, MatFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
}
