import { Component } from '@angular/core';
import { SharedService } from './../../shared.service';

@Component({
  selector: 'app-dash-nav',
  standalone: true,
  imports: [],
  templateUrl: './dash-nav.component.html',
  styleUrl: './dash-nav.component.css',
})
export class DashNavComponent {
  expand: boolean | undefined;
  constructor(private SharedService: SharedService) {
    this.SharedService.expand$.subscribe((expand) => (this.expand = expand));
  }
}
