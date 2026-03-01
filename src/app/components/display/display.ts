import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-display',
  templateUrl: './display.html',
  styleUrls: ['./display.scss'],
  standalone: true,
  imports: [MatFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Display {
  constructor() {}
}
