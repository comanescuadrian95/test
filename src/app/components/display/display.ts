import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.html',
  styleUrls: ['./display.scss'],
  standalone: false,
})
export class Display {
  constructor() {}
}
