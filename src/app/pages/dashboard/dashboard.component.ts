import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BottomDockComponent } from '../../components/bottom-dock/bottom-dock.component';
import { DashNavComponent } from '../../components/dash-nav/dash-nav.component';
import { DashSideNavComponent } from '../../components/dash-side-nav/dash-side-nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, BottomDockComponent, DashNavComponent, DashSideNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
