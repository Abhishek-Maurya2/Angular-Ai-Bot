import { Component } from '@angular/core';
import { GeminiService } from '../../gemini.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [NgFor],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.css',
})
export class ChatBubbleComponent {
  search: string = '';
  gSearch() {
    window.open('https://www.google.com/search?q=' + this.search, '_blank');
  }
  History: any = [];
  constructor(private GeminiService: GeminiService) {
    this.GeminiService.History.subscribe((history) => {
      if (history) {
        this.History.push(history);
      }
    });
  }
}
