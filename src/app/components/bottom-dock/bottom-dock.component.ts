import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { GeminiService } from '../../gemini.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bottom-dock',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bottom-dock.component.html',
  styleUrl: './bottom-dock.component.css',
})
export class BottomDockComponent {
  expand: boolean | undefined;
  prompt: string = '';
  constructor(
    private SharedService: SharedService,
    private GeminiService: GeminiService
  ) {
    this.SharedService.expand$.subscribe((expand) => (this.expand = expand));
  }
  generate(event: Event) {
    event.preventDefault();
    this.GeminiService.generate(this.prompt);
  }
}
