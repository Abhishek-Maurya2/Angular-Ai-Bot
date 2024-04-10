import { Component } from '@angular/core';
import { SharedService } from './../../shared.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dash-side-nav',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dash-side-nav.component.html',
  styleUrl: './dash-side-nav.component.css',
})
export class DashSideNavComponent {
  expand: boolean | undefined;
  constructor(private SharedService: SharedService) {
    this.SharedService.expand$.subscribe((expand) => (this.expand = expand));
  }
  toggleSideBar() {
    this.SharedService.toggleSideBar();
  }
}
