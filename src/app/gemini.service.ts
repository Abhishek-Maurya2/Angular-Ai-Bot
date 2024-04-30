import { Injectable, inject } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import * as marked from 'marked';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();
  History: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private gemini: GoogleGenerativeAI;
  // private firestore: Firestore = inject(Firestore);
  constructor() {
    this.gemini = new GoogleGenerativeAI(environment.gemini.api);
  }
  async generate(prompt: string) {
    this._loading.next(true);
    const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Manually convert Markdown to HTML
    text = text
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // bold
      .replace(/\*(.*?)\*/g, '<i>$1</i>') // italics
      .replace(/~~(.*?)~~/g, '<del>$1</del>') // strikethrough
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') // link
      .replace(/```(.*?)```/gs, '<pre class="code-block"><code>$1</code></pre>') //code block
      .replace(/`(.*?)`/g, '<code>$1</code>') // inline code
      .replace(/> (.*?)(\n|$)/g, '<blockquote>$1</blockquote>'); // blockquote

    this.History.next({
      prompt: prompt,
      response: text,
    });

    this._loading.next(false);
  }
}
