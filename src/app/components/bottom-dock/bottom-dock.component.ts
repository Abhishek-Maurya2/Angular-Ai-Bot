import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-bottom-dock',
  standalone: true,
  imports: [],
  templateUrl: './bottom-dock.component.html',
  styleUrl: './bottom-dock.component.css',
})
export class BottomDockComponent {
  expand: boolean | undefined;
  constructor(private SharedService: SharedService) {
    this.SharedService.expand$.subscribe((expand) => (this.expand = expand));
  }
}
