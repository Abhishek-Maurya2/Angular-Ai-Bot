import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from './../../shared.service';

@Component({
  selector: 'app-nav-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './nav-modal.component.html',
  styleUrl: './nav-modal.component.css',
})
export class NavModalComponent {
  modal: boolean = false;
  constructor(private SharedService: SharedService) {
    this.SharedService.modal$.subscribe((modal) => (this.modal = modal));
  }
  toggleModal() {
    this.SharedService.toggleModal();
  }
}
