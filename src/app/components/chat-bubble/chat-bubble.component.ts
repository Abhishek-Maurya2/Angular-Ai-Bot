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
  user: any;
  History: any = [];

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.History = JSON.parse(localStorage.getItem('history') || '[]');
  }
  gSearch(prompt: string) {
    window.open('https://www.google.com/search?q=' + prompt, '_blank');
  }
  share(prompt: string) {
    if (navigator.share) {
      navigator.share({
        title: 'Gemini Chat',
        text: prompt,
        url: 'https://gemini-chat.web.app',
      });
    }
  }
  copyToClipboard(response: string) {
    navigator.clipboard.writeText(response);
  }
  constructor(private GeminiService: GeminiService) {
    this.GeminiService.History.subscribe((history) => {
      if (history) {
        this.History.push(history);
        localStorage.setItem('history', JSON.stringify(this.History));
      }
      if (this.History.length == 0 && localStorage.getItem('history')) {
        this.History = JSON.parse(localStorage.getItem('history') || '[]');
      }
    });
  }
}
